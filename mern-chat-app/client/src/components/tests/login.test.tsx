import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "../../components/Login";
import api from "../../utils/api";
import { store } from "../../redux/store";

jest.mock("../../utils/api", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  localStorage.clear();
});
test("renders login page correctly", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: /login/i });
  expect(emailInput).toBeVisible();
  expect(passwordInput).toBeVisible();
  expect(loginButton).toBeEnabled();
});

test("updates input fields when typing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  expect(emailInput).toHaveValue("test@example.com");
  expect(passwordInput).toHaveValue("password123");
});
test("redirects to chat after successful login", async () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  (api.post as jest.Mock).mockResolvedValueOnce({
    data: { user: { email: "test@example.com" }, token: "fake-token" },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(localStorage.getItem("token")).toBe("fake-token");
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/chat");
  });
});

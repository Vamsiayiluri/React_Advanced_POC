import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Signup from "../../components/Signup";
import api from "../../utils/api";

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
test("renders signup page correctly", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
  const nameInput = screen.getByPlaceholderText("Email");

  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const signUpButton = screen.getByRole("button", { name: /signup/i });

  expect(nameInput).toBeVisible();
  expect(emailInput).toBeVisible();
  expect(passwordInput).toBeVisible();
  expect(signUpButton).toBeEnabled();
});

test("updates input fields when typing", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  expect(nameInput).toHaveValue("John Doe");
  expect(emailInput).toHaveValue("test@example.com");
  expect(passwordInput).toHaveValue("password123");
});

test("redirects to login after successful signup", async () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  (api.post as jest.Mock).mockResolvedValueOnce({ data: {} });

  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });

  const button = screen.getByRole("button", { name: /signup/i });
  await userEvent.click(button);

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});

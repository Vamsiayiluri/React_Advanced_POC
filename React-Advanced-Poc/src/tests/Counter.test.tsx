import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/TestingComponents/Counter";

describe("Counter Component", () => {
  test("renders correctly", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("increments counter when button is clicked", () => {
    render(<Counter />);
    const incrementButton = screen.getByText("Increment");

    fireEvent.click(incrementButton);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();

    fireEvent.click(incrementButton);
    expect(screen.getByText("Count: 2")).toBeInTheDocument();
  });

  test("resets counter when reset button is clicked", () => {
    render(<Counter />);
    const incrementButton = screen.getByText("Increment");
    const resetButton = screen.getByText("Reset");

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("has correct data-testid for counter value", () => {
    render(<Counter />);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("Count: 0");
  });
});

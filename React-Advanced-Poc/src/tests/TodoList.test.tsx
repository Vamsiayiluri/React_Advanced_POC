import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TestingComponents/TodoList";

describe("TodoList Component", () => {
  test("renders correctly", () => {
    render(<TodoList />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  test("allows user to enter a task", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Enter a task");

    fireEvent.change(input, { target: { value: "Eating" } });
    expect(input).toHaveValue("Learn Jest");
  });

  test("adds a task when clicking 'Add Task'", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Enter a task");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "Running" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Learn Jest")).toBeInTheDocument();
  });

  test("does not add empty tasks", () => {
    render(<TodoList />);
    const addButton = screen.getByText("Add Task");

    fireEvent.click(addButton);

    expect(screen.queryByRole("listitem")).toBeNull();
  });
});

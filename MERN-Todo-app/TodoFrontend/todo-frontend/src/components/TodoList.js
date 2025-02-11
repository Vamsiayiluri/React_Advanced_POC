import React from "react";

const TodoList = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <div>
      <h2>To-Do List</h2>
      {todos.map((todo) => (
        <div key={todo._id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo._id)}
          />
          <span>{todo.task}</span>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

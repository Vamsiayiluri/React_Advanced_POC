import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const addTodo = (newTodo) => {
    axios
      .post("http://localhost:5000/todos", newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios
      .put(`http://localhost:5000/todos/${id}`, { completed: !todo.completed })
      .then((response) => {
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      })
      .catch((error) => {
        console.error("Error toggling task:", error);
      });
  };

  return (
    <div className="App">
      <h1>To-Do Application</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

export default App;

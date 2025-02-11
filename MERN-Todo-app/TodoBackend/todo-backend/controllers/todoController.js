const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ message: "Error fetching todos", error: err });
  }
};

const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error saving todo:", err);
    res.status(400).json({ message: "Error saving todo", error: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res
      .status(400)
      .json({ message: "Error updating todo", error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res
      .status(400)
      .json({ message: "Error deleting todo", error: err.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

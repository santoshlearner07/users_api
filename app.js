const express = require("express");
// const mongoose = require("mongoose");
const app = express();
const User = require("./models/userModel");
const userRoutes = require("./api/routes/user");
app.use(express.json());
// app.use("/users", userRoutes);

// cors = Cross-origin resource sharing
const cors = require("cors");
const Todos = require("./models/todoModel");
const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOption));

app.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/users", async (req, res) => {
  // console.log(req.body)
  // res.send(req.body)
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todos = await Todos.create(req.body);
    res.status(200).json(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todos.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get(`/users/:userId`, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Todos.find({ userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get(`/users/:userId/:todoId`, async (req, res) => {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  try {
    const user = await Todos.find({ userId, todoId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/todos/:userId/:todoId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const todoItem = await Todos.deleteOne({ userId, todoId });
    if (!todoItem) {
      return res.status(404).json({ message: "Cannot find todo item." });
    }
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/todos/:userId/:todoId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const todoItem = await Todos.replaceOne({ userId, todoId },req.body);
    if (!todoItem) {
      return res.status(404).json({ message: "Cannot find todo item." });
    }
    res.status(200).json(todoItem);
    console.log(todoItem)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = app;

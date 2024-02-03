const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  userId: {
    type: Number,
  },
  todoId: {
    type: Number,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  desc: {
    type: String,
  },
});

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;

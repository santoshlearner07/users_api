const express = require("express");
const nodemailer = require("nodemailer");
const mailGen = require("mailgen");
// const mongoose = require("mongoose");
const app = express();
const User = require("./models/userModel");
const userRoutes = require("./api/routes/user");
app.use(express.json());
// app.use("/users", userRoutes);
const { EMAIL, PASSWORD } = require("./env.js");
const Todos = require("./models/todoModel");

// cors = Cross-origin resource sharing
const cors = require("cors");
const corsOption = {
  origin: ["http://localhost:3000"],
  // origin: ["https://my-json-server.typicode.com/santoshlearner07/users_api"],
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

app.post("/handleotp", async (req, res) => {
  const userEmail = req.body.email;
  const userName = req.body.name;
  let randomOTP = Math.floor(Math.random() * 1000000);
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new mailGen({
    theme: "default",
    product: {
      name: "Multi User",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: userName,
      intro: "Your One Time Password",
      outro: randomOTP,
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Your OTP",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "You should receive an email",
        otp: randomOTP,
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });
});

app.post("/users", async (req, res) => {
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
    const todoItem = await Todos.replaceOne({ userId, todoId }, req.body);
    if (!todoItem) {
      return res.status(404).json({ message: "Cannot find todo item." });
    }
    res.status(200).json(todoItem);
    console.log(todoItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.deleteOne({ userId });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Todos.deleteMany({ userId });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

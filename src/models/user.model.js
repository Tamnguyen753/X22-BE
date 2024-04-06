const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const newId = require("../ultils/main");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: newId(),
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };

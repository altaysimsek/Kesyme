const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

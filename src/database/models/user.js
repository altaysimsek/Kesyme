const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (error) {}
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("1Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("2Unable to login"); //Şifre hatalı
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "blogi");
  user.tokens = token;
  await user.save();
  return this.tokens;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

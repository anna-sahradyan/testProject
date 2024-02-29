const mongoose = require("mongoose");
const {schemaOptions} = require("./modelOptions");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add a  email"],
    unique: true,
    trim: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"],
  },
  password: {
    type: String, required: [true, "Please add a  password"], minLength: [6, "Password must be up to 6 chapters"],
  },
  id: {
    type: String,
  },

}, {
  schemaOptions
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

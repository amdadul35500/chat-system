const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      max: 20,
      min: 2,
    },
    middlename: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      required: true,
      max: 20,
      min: 2,
    },
    username: {
      type: String,
      required: true,
      min: 5,
    },
    birthday: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    gender: {
      type: String,
      default: "",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userShema);

const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
  },
  { collection: "userdata" }
);

const UserModel = mongoose.model("UserData", User);
module.exports = UserModel;

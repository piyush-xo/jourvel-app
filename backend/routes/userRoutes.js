const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const generateToken = require("../utils/tokenGenerator");
const router = express.Router();
const {userVerification} = require("../middleware/authMiddelware");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.send({ error: "User already registered" }, 409);
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(newUser);
    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.send({ user: { id: newUser._id, username: newUser.username } }, 201);
  } catch (err) {
    console.log(err);
    res.send({ error: "Server error" }, 500);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.send({ error: "User not found" }, 404);
    }
    const isCorrectPassword = await bcrypt.compare(req.body.password,user.password);
    console.log(isCorrectPassword);
    if (!isCorrectPassword) {
      return res.send({ error: "Wrong password" }, 401);
    }
    const token = generateToken(user._id);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res.send({user: { id: user._id, username: user.username } }, 200);
  } catch (err) {
    console.log(err);
    res.send({ error: "Server error" }, 500);
  }
});

router.post('/',userVerification)

module.exports = router;

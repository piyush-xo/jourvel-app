const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    res.send("Registration successful", 201);
  } catch (err) {
    console.log(err);
    res.send("User already registered", 409);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      res.send("User not found", 404);
    } else {
      user.password === req.body.password
        ? res.send(user, 200)
        : res.send("Wrong password", 401);
    }
  } catch (err) {
    console.log(err);
    res.send("Server error", 500);
  }
});

module.exports = router;

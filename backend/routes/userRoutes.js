const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const generateToken = require("../utils/tokenGenerator");
const router = express.Router();
const { userVerification } = require("../middleware/authMiddelware");
const jwt = require("jsonwebtoken");

//user registeration 
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
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    //   path: "/",
    // });
    res.send({ token, user: { id: newUser._id, username: newUser.username } }, 201);
  } catch (err) {
    console.log(err);
    res.send({ error: "Server error" }, 500);
  }
});

//user login
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.send({ error: "User not found" }, 404);
    }
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(isCorrectPassword);
    if (!isCorrectPassword) {
      return res.send({ error: "Wrong password" }, 401);
    }
    const token = generateToken(user._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    //   path: "/",
    // });
    res.send({token, user: { id: user._id, username: user.username } }, 200);
  } catch (err) {
    console.log(err);
    res.send({ error: "Server error" }, 500);
  }
});

//user data retrival
router.get("/:id", userVerification, async(req, res) => {
  const userData = await UserModel.findOne({_id: req.params.id})
  console.log(userData);
  if(!userData) {
    return res.send({ error: "User not found" }, 404);
  }
  res.send(userData, 200);
})

//user data update
router.post("/:id", userVerification, async(req, res) => {
  console.log("update", req.body);
})

//user verification
router.post("/", async(req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.send({ error: "Access denied. Token not found." }, 401);
    }
    jwt.verify(token, "secret123", async (err, verifiedUser) => {
      if (err) {
        return res.send(
          { error: "Access denied. Token verification failed." },
          401
        );
      }
      const user = await UserModel.findById(verifiedUser.id);
      if (!user) {
        return res.send({ error: "Access denied. User not found." }, 401);
      }
      console.log("userVerification")
      res.send({ user: { id: user._id, username: user.username } }, 200);  
    });
  } catch (err) {
    console.log(err);
    res.send({ error: "Server error" }, 500);
  }
});

module.exports = router;

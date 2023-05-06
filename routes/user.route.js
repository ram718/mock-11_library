const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

// Register API
userRouter.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (user) {
      res.status(400).send({ msg: "User already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const userData = {
          name,
          email,
          password: hash,
          isAdmin,
        };
        const data = new UserModel(userData);
        await data.save();
        res.status(201).send({ msg: "User is registered successfully" });
      });
    }
  } catch (err) {
    res.status(400).send({ msg: "Cannot register" });
  }
});

// Login API
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, "masai");
        res.status(201).send({ msg: "Login successfull", token });
      }
    });
  } catch (err) {
    res.status(400).send({ msg: "Cannot login" });
  }
});

module.exports = { userRouter };

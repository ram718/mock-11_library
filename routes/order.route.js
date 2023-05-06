const express = require("express");
const orderRouter = express.Router();
const { OrderModel } = require("../models/order.model");
const { UserModel } = require("../models/user.model");
const { BookModel } = require("../models/book.model");
const jwt = require("jsonwebtoken");

// Order Api
orderRouter.post("/order", async (req, res) => {
  const { books, totalAmount } = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  const userData = await UserModel.findOne({ _id: decoded.userID });
  //   user = userData;
  try {
    if (userData) {
      const data = new OrderModel({ user: decoded.userID, books, totalAmount });
      await data.save();
      res.status(201).send({ msg: "Order is successfull" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Unable to process the request" });
  }
});

// Orders Api
orderRouter.get("/orders", async (req, res) => {
  try {
    const books = await BookModel.find();
    const data = await OrderModel.find();
    for (let i = 0; i < data.length; i++) {
      data[i].user = await UserModel.findOne({ _id: data[i].user });
      for (let j = 0; j < data[i].books.length; j++) {
        data[i].books[j] = books.filter((e) => e._id == data[i].books[j])[0];
      }
    }

    res.status(200).send();
  } catch (err) {
    res.status(400).send({ msg: "Unable to process the request" });
  }
});

module.exports = { orderRouter };

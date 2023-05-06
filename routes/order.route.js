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

module.exports = { orderRouter };

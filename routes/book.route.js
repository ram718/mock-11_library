const express = require("express");
const bookRouter = express.Router();
const jwt = require("jsonwebtoken");
const { BookModel } = require("../models/book.model");
const { UserModel } = require("../models/user.model");

// Post book Api
bookRouter.post("/", async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");

  const user = await UserModel.findOne({ _id: decoded.userID });

  try {
    if (user.isAdmin) {
      const data = new BookModel(payload);
      await data.save();
      res.status(201).send({ msg: "Bood is added successfully" });
    } else {
      res.status(400).send({ msg: "Not authorized" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Not authorized" });
  }
});

// All Books Api
bookRouter.get("/", async (req, res) => {
  const { category, author } = req.query;
  try {
    if (category) {
      const data = await BookModel.find();
      const books = data.filter((e) => e.category == category);
      res.status(200).send(books);
    } else if (author && category) {
      const data = await BookModel.find();
      const books = data.filter((e) => {
        return e.category == category && e.author == author;
      });
      res.status(200).send(books);
    } else {
      const data = await BookModel.find();
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).send({ msg: "Books not found" });
  }
});

// Book with iD
bookRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await BookModel.findOne({ _id: id });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: "Book not found" });
  }
});

// Books with category
bookRouter.get("/", async (req, res) => {
  try {
  } catch (err) {
    res.status(400).send({ msg: "No books with this category" });
  }
});

module.exports = { bookRouter };

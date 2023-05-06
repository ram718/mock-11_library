const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./db");
const { auth } = require("./middleware/auth.middleware");
const { userRouter } = require("./routes/user.route");
const { bookRouter } = require("./routes/book.route");
const { orderRouter } = require("./routes/order.route");

app.use(express.json());

app.use("", userRouter);
app.use(auth);
app.use("/books", bookRouter);
app.use("", orderRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server is running at port ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});

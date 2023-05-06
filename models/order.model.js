const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: String,
    books: Array,
    totalAmount: Number,
  },
  { versionKey: false }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };

const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentsSchema = new Schema({
  tansactionId: String,
  email: String,
  TotalPrice: Number,
  quantity: Number,
  status: String,
  itemName: Array,
  cartItems: Array,
  menuItems: Array,
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("payment", paymentsSchema);

module.exports = Payment;

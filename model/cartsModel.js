const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    menuItemId : String,
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 3
      },
      recipe: String,
      image: String,
      price: Number,
      quantity: Number,
      email: {
        type: String,
        trim: true,
        required: true,
      }
  });

  const Carts = mongoose.model("Cart", cartSchema);
  module.exports = Carts
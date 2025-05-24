const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "please enter a name"],
    minLength: [3, "name should be at least 3 characters"],
  },
  recipe: String,
  image: String,
  price: Number,
  category: String,
  createdAt: { type: Date, default: Date.now },
  // description: String,   to make sure menu added appears at the frontend and at the top of the menu add craeated at

});

const Menu = mongoose.model("menu", menuSchema);
module.exports = Menu;

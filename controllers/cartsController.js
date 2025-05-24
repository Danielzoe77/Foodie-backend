const asyncHandler = require("express-async-handler");
const Carts = require("../model/cartsModel");

//gets carts using email
const getCartsByEmail = asyncHandler ( async (req, res) => {
    try {
      const email = req.query.email;
    //   console.log(email)
      const filter = { email: email };
      const result = await Carts.find(filter).exec();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});



// // post a cart when add to cart button is clicked
const addToCart = async (req, res) => {
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
    try {
        // check if existing cart item to avoid duplicates
        const existingCartItem = await Carts.findOne({ menuItemId });
        if (existingCartItem) {
            //return res.status(400).json({ message: "Item already in cart to add simply increase the quantity" });
            return res.send({ status: 400, error: "Item already in cart" });
        }
        const cartItem =  await Carts.create({ menuItemId, name, recipe, image, price, quantity, email });
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// const addToCart = asyncHandler ( async (req, res) => {
//     const cartItem = req.body;
//     try {
//         const existingCartItem = await Carts.findOne({ menuItemId: cartItem.menuItemId });
//         if (existingCartItem) {
//             return res.status(400).json({ message: "Item already in cart to add simply increase the quantity" });
//         }
//         const newCartItem = await Carts.create(cartItem);
//         res.status(201).json(newCartItem);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


//delete cart item

const deleteCart = asyncHandler ( async (req, res) => {
    const cartId = req.params.id;
    try {
        const result = await Carts.findByIdAndDelete(cartId);
        if(!result) {
            return res.status(404).json({ message: "cart item not found" });
        }
        res.status(200).json({message: "cart item deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
});

//update cart item
const updateCart = asyncHandler ( async (req, res) => {
  const cartId = req.params.id;
  const {  email, menuItemId, name, recipe, image, price, quantity } = req.body;
  try {
      const result = await Carts.findByIdAndUpdate(cartId, { email, menuItemId, name, recipe, image, price, quantity }, { new: true, runValidators: true});
      if(!result) {
        return  res.status(404).json({ message: "cart item not found" });
      }
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
      
  }
})


//get single recipe
const getSingleCart = asyncHandler (async (req, res) =>{
    const cartId = req.params.id;
    try{
        const cartItem = await Carts.findById(cartId) 
        res.status(201).json(cartItem);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
})


module.exports = {getSingleCart, updateCart, getCartsByEmail, addToCart,deleteCart}
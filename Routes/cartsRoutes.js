const express = require('express');
const router = express.Router();
const {getCartsByEmail, addToCart, deleteCart, updateCart, getSingleCart} = require('../controllers/cartsController.js');
const verifyJWT = require('../middleware/verifyToken.js');


//get all add to cart; the reason for add verifyjwt is to check if the user is logged in and if he is logged out no body will access his cart via his email/this route
router.get('/', getCartsByEmail);

//to post a cart when add to cart button is clicked
router.post('/', addToCart);

//delete cart item
router.delete('/:id', deleteCart);

//update cart
router.put('/:id', updateCart);

//get sisngle route
router.get('/:id', getSingleCart )

module.exports = router;
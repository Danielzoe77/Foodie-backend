 const express = require('express');
const { postPayments, getAllPayments, getAllPaymentsByAdmin, deletePaymentById, confirmPayment } = require('../controllers/paymentsController');
const router = express.Router();
//verifyJWT
const verifyJWT = require('../middleware/verifyToken');

router.post ("/",verifyJWT, postPayments )
router.get("/",verifyJWT, getAllPayments )

//get all payments By admin user to manage bookings
router.get("/admin",verifyJWT, getAllPaymentsByAdmin )

//delete a payment by admin using Id in manage bookings
router.delete("/:id",verifyJWT, deletePaymentById )

// confirmed payment
router.patch('/admin/:id', verifyJWT,confirmPayment);



module.exports = router;


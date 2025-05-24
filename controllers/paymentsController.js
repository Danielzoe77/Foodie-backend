const asyncHandler = require("express-async-handler");
const Payment = require("../model/paymentsModel");
const Carts = require("../model/cartsModel");
const Menu = require("../model/menuModel");
const User = require("../model/userModel");
const {default : mongoose} = require("mongoose");
const ObjectId = mongoose.Types.ObjectId




const getAllPayments = asyncHandler(async (req, res) => {
 
    const email = req.query.email;
    const filter = { email: email }
    
    try {
      
      const decodedEmail = req.decoded.email;
      if(email !== decodedEmail){
        return res.status(403).send({message:"Forbidden access"})
      }
     const payments = await Payment.find(filter).sort({ createdAt: -1 }).exec();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  const postPayments = async (req, res)=>{
    const newPayment = req.body;
    try{
      const result = await Payment.create(newPayment)
        //once a user as succesfully made a payment, their cart should be cleared
  const cartIds = newPayment.cartItems.map(id => new ObjectId(id));
  const deleteCartRequests = await Carts.deleteMany({ _id: { $in: cartIds } });

      res.status(200).json({result, deleteCartRequests});

    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

//  get all the users orders and payments fr admin only

const getAllPaymentsByAdmin = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete a particular payement
const  deletePaymentById = async (req, res) => {
    const paymentsId = req.params.id;
    try {
        const result = await Payment.findByIdAndDelete(paymentsId);
        if(!result) {
            return res.status(404).json({ message: "payment not found" });
        }
        res.status(200).json({message: "payment deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

//confirm payment and update status to confirmed
const confirmPayment = async (req, res) => {
  const paymentId = req.params.id;
  try {
      const result = await Payment.findByIdAndUpdate(paymentId, { status: "confirmed" }, { new: true, runValidators: true});
      if(!result) {
        return  res.status(404).json({ message: "payment not found" });
      }
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
      
  }
}







module.exports = {
    getAllPayments,
  postPayments,
  getAllPaymentsByAdmin,
  deletePaymentById,
  confirmPayment

}
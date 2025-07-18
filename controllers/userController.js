
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

  





//get all users


const getAllUsers =  async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
} 




const createUser = async (req, res) => {
    const user = req.body;
    const query = { email: user.email };

    try {
        const existingUser = await User.findOne(query);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await User.create(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
  

const loginUser = async (req, res) => {
    const { name, email, photoURL } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Login successful",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


//delete a user

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await User.findByIdAndDelete(userId);
        if(!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

//get admin
const getAdmin = async (req, res) => {
    const email = req.params.email;
    const query = { email:email}
    try {
        const user = await User.findOne(query);
        // console.log(user)
        if(email !== req.decoded.email){
            return res.status(403).send({message:"Forbidden access"})
        }

        //This is to check for the admin
        let admin = false
        if(user){
            admin= user?.role === "admin" ;
        }
        res.status(200).json({admin})
    } catch (error) {
        
    }
}

//make a admin of a user segment
const makeAdmin = async (req, res) => {
    const userId = req.params.id;
    const { role, name, photoURL, email} = req.body;

    try{
        const updatedUser = await User.findByIdAndUpdate(userId,
           { role : "admin" } ,
           { new: true, runValidators: true},
        );
        if(!updatedUser){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json(updatedUser)
    }
catch(error){
    return res.status(403).send({message:error.message})
}
}

module.exports = {
    
    getAllUsers,
    createUser,
    deleteUser,
    getAdmin,
    makeAdmin,
    loginUser
}
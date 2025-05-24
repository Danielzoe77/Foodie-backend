const jwt = require("jsonwebtoken");


//verify JWT
const verifyJWT = (req, res, next) => {
    // console.log(req.headers.authorization)
     if(!req.headers.authorization){
       return res.status(401).send({
         message:"unauthorised access"
       });
     }
     const token = req.headers.authorization.split(" ")[1];
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
       if (err) {
         return res.status(403).send({
           message:"Forbidden access"
         });
       }
       req.decoded = decoded;
       next();
     }); 
   }

   module.exports = verifyJWT
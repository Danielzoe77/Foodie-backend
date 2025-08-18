require("dotenv").config();
const express = require("express");
const connectDB = require("./config.js");
const mongoose = require("mongoose");
const menuRoute = require("./Routes/menuRoutes");
const cartRoute = require("./Routes/cartsRoutes");
const userRoute = require("./Routes/userRoutes");
const paymentRoute = require("./Routes/paymentsRoute");

var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
//jwt
const verifyJWT = require("./middleware/verifyToken.js");
const corsOptions = {
  origin: ["https://eathathon.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


const port = 3000;
//  connectDB();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2hrs",
  });
  res.send({ token });
});

app.use("/menu", menuRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);
app.use("/payments", paymentRoute);

// stripe code

app.post("/create-payment-intent", async (req, res) => {
  const { TotalPrice } = req.body;
  const amount = TotalPrice * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", verifyJWT, (req, res) => {
  res.send("Hello Food is raedy!");
});

const startServer = async () => {
  try {
    await connectDB();
    // const dbName = "fullstack"; // specify database name
    // const db = mongoose.connection.useDb(dbName);
    // const menuCollection = db.collection("ecommerce");
    // const cartCollection = db.collection("cart");

    // app.get("/menu", async (req, res) => {
    //   const menu = await menuCollection.find().toArray();
    //   res.send(menu);
    // });

    // posting your requsest to the datadbase

    // app.post("/carts", async (req, res) => {
    //   const cartItem = req.body;
    //   const result = await cartCollection.insertOne(cartItem);
    //   res.send(result);
    // });

    // getting carts using email from the database that d user added

    // app.get("/carts", async (req, res) => {
    //   const email = req.query.email;
    //   const filter = { email: email };
    //   const result = await cartCollection.find(filter).toArray();
    //   res.send(result);
    // });

    //delete item
    // app.delete("/carts/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new mongoose.Types.ObjectId(id) };
    //   const result = await cartCollection.deleteOne(filter);
    //   res.send(result);
    // });

    //get specific cart
    // app.get("/carts/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new mongoose.Types.ObjectId(id) };
    //   const result = await cartCollection.findOne(filter);
    //   res.send(result);
    // });

    //To decrease quantity of the item an easy way to go about it is to visit mongodb doc and check update and replace
    // app.put("/carts/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const quantity = req.body.quantity;
    //   const filter = { _id: new mongoose.Types.ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       quantity: quantity,
    //     },
    //   };
    //   const result = await cartCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("error:", error.message);
  }
};
startServer();

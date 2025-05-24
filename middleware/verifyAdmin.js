const User = require("../model/userModel");

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(403).send({ message: "Forbidden access" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};

module.exports = verifyAdmin;

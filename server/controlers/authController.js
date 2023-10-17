const { MongoClient, ObjectId } = require("mongodb");
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await client.connect();
    const user = await connection
      .db("prolancer")
      .collection("users")
      .findOne({ email });

    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "User not found" });

    const userId = user._id.toString(); // Convert MongoDB _id to string
    const roles = user.roles;

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const userRoles = Object.values(roles);

      const accessToken = jwt.sign(
        { id: userId, roles: userRoles }, // Use User ID
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // const accessToken = jwt.sign(
      //   { id: userId }, // Use User ID
      //   process.env.ACCESS_TOKEN_SECRET,
      //   { expiresIn: "1h" }
      // );

      const refreshToken = jwt.sign(
        { id: userId }, // Use User ID
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: false, // set to true if you're using https
      });

      res.send({ accessToken });
    } else {
      res.status(400).send({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { handleLogin };

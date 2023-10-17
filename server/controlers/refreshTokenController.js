const { MongoClient, ObjectId } = require("mongodb");
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).send({ message: "No refresh token provided" });
  const refreshToken = cookies.jwt;

  try {
    const connection = await client.connect();

    // Decode the JWT to get the user ID and roles
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.id;

    // Search for a user by userId
    const user = await connection
      .db("prolancer")
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const userStringId = user._id.toString();
    const roles = user.roles;

    // Verify that the decoded user ID matches the real user ID
    if (userStringId !== userId) {
      return res.status(403).send({ message: "Invalid token" });
    }
    const userRoles = Object.values(roles);

    // Generate a new access token with user ID and roles
    const accessToken = jwt.sign(
      { id: userStringId, roles: userRoles },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.send({ accessToken });
    await connection.close();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { handleRefreshToken };

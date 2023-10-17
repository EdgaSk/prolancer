const { MongoClient, ObjectId } = require("mongodb");
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(204).send({ message: "No refresh token provided" });
  }

  try {
    // Delete the refresh token from the client's cookies
    res.clearCookie("jwt", { httpOnly: true });

    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { handleLogout };

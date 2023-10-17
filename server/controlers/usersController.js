const { MongoClient, ObjectId } = require("mongodb");
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);

const getAllUsers = async (req, res) => {
  try {
    const connection = await client.connect();
    const data = await connection
      .db("prolancer")
      .collection("users")
      .find()
      .toArray();
    await connection.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllUsers };

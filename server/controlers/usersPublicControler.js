const { MongoClient, ObjectId } = require("mongodb");
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);

const getAllUsers = async (req, res) => {
  try {
    const connection = await client.connect();
    const data = await connection
      .db("prolancer")
      .collection("users")
      .find({}, { projection: { _id: 1, name: 1, surname: 1, email: 1 } })
      .toArray();
    await connection.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await client.connect();
    const data = await connection
      .db("prolancer")
      .collection("users")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { _id: 1, name: 1, surname: 1, email: 1 } }
      );
    await connection.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllUsers, getUserById };

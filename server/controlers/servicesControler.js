const { MongoClient, ObjectId } = require("mongodb");
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);
const upload = require("../middleware/multer");
const { ca } = require("date-fns/locale");

const getAllServices = async (req, res) => {
  try {
    const connection = await client.connect();
    const data = await connection
      .db("prolancer")
      .collection("services")
      .find()
      .toArray();
    await connection.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const postService = async (req, res) => {
  try {
    const connection = await client.connect();
    const { title, categories, description } = req.body;
    const imageUrl = req.file.filename;
    console.log(imageUrl);
    const data = await connection
      .db("prolancer")
      .collection("services")
      .insertOne({ title, categories, description, imageUrl });
    await connection.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllServices, postService };

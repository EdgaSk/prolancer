const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const router = express.Router();
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);

router.get("/", async (req, res) => {
  try {
    const connection = await client.connect();
    const data = await connection
      .db("prolancer")
      .collection("jobs")
      .find()
      .toArray();
    await connection.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

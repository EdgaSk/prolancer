const { MongoClient, ObjectId } = require("mongodb");
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  let roleLevel = 0; // Default role level

  if (role === "freelancer") {
    roleLevel = 9;
  } else if (role === "employer") {
    roleLevel = 8;
  } // Add more conditions if needed for other roles

  try {
    const connection = await client.connect();
    const duplicate = await connection
      .db("prolancer")
      .collection("users")
      .findOne({ email });
    if (duplicate)
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    const data = await connection
      .db("prolancer")
      .collection("users")
      .insertOne({
        roles: { [role]: roleLevel },
        name,
        surname,
        email,
        password: bcrypt.hashSync(password, 10),
      });
    await connection.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { handleNewUser };

const { MongoClient, ObjectId } = require("mongodb");
const URI = process.env.DB_PATH;
const client = new MongoClient(URI);

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
    const {
      date,
      title,
      categories,
      language,
      englishlanguageLevel,
      location,
      description,
      price,
      skills,
    } = req.body;
    const userId = new ObjectId(req.userId);
    const imageUrl = req.file.filename;
    const data = await connection
      .db("prolancer")
      .collection("services")
      .insertOne({
        userId,
        date,
        title,
        categories,
        language,
        englishlanguageLevel,
        location,
        description,
        price,
        imageUrl,
        skills,
      });
    await connection.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getServicesWithUser = async (req, res) => {
  try {
    const connection = await client.connect();
    const data = await connection
      .db("prolancer")
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "services",
            localField: "_id",
            foreignField: "userId",
            as: "usersServices",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            surname: 1,
            email: 1,
            usersServices: 1,
          },
        },
      ])
      .toArray();
    await connection.close();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getServicesWithUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await client.connect();
    const data = await connection
      .db("prolancer")
      .collection("services")
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "servicesUser",
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            date: 1,
            categories: 1,
            language: 1,
            englishlanguageLevel: 1,
            location: 1,
            description: 1,
            price: 1,
            imageUrl: 1,
            skills: 1,
            servicesUser: {
              name: 1,
              surname: 1,
              email: 1,
            },
          },
        },
        {
          $unwind: "$servicesUser", // grąžina vietoj masyvo objektą, nes masyve tik vienas elementas
        },
      ])
      .toArray();

    await connection.close();

    if (data.length > 0) {
      res.send(data[0]);
    } else {
      res.status(404).send({ error: "Paslauga nerasta" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = {
  getAllServices,
  postService,
  getServicesWithUser,
  getServicesWithUserByID,
};

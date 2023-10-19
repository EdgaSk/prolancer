const express = require("express");
const userController = require("../controlers/usersController");
const router = express.Router();

router.route("/").get(userController.getAllUsers).post().put().delete();
router.route("/:id").get(userController.getUserById).post().put().delete();

module.exports = router;

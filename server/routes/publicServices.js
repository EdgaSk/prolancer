const express = require("express");
const servicesController = require("../controlers/servicesControler");
const router = express.Router();

router.route("/").get(servicesController.getAllServices).post().put().delete();

module.exports = router;

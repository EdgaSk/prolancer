const express = require("express");
const servicesController = require("../controlers/servicesControler");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/services" });

router
  .route("/")
  .get(servicesController.getAllServices)
  .post(upload.single("image"), servicesController.postService)
  .put()
  .delete();

module.exports = router;

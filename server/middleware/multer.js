const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/services");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname).substring(1); // get file extension
    const filename = `${uniqueSuffix}.${extension}`; // created unique filename
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

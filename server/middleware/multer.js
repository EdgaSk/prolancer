const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/services");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop(); // Gauti plėtinį iš originalaus failo pavadinimo
    const filename = `${uniqueSuffix}.${extension}`; // Sukurti failo pavadinimą su plėtiniu
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

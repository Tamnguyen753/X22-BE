const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath = path.join(__dirname, "..", "..", "public", "posts");

      cb(null, filePath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = file.originalname.split(".").pop();
      const filename = `${file.originalname}-${uniqueSuffix}.${fileExtension}`;

      cb(null, filename);
    },
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload;
const { Router } = require("express");
const { uploadFile, upload } = require("../controler/common.controller");

const commonRoute = Router();

commonRoute.post("/uploadFile", upload.array('images', 5), uploadFile);


module.exports = { commonRoute };

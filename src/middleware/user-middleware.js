const jwt = require("jsonwebtoken");
const Err = require("../ultis/error.js");
const userModel = require("../models/user.js");

const verifyTokenMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Err("Token must be provided", 403);
    }
    const fields = authorization.split(" ");
    if (fields.length !== 2) {
      throw new Err("Method auth is not supported!", 400);
    }

    const token = fields[1];
    const decoded = jwt.verify(token, process.env.SC);
    console.log(decoded);
  } catch (error) {
    res.status(401).send({
      message: error.message,
      data: null,
    });
    return;
  }
};

module.exports = verifyTokenMiddleware;

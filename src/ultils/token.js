const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.SC;

const getToken = (data) => {
  const token = jwt.sign(data, SECRET_KEY, {
    expiresIn: "10h",
  });
  return token;
};

module.exports = { getToken };

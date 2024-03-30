const express = require('express');
const StaffRoute = express.Router();

const {Register, Login, getStaff, CreateStaffAccount} = require('../controler/staffAccount');
const {verifyToken} = require('../middleware/auth');
const {checkTokenAndType} = require("../middleware/CheckTokenAndType.js");

StaffRoute.post("/registerStaff", Register);
StaffRoute.post("/loginStaff", Login);
StaffRoute.get("/", verifyToken, getStaff);
StaffRoute.post("/createStaffAccount",checkTokenAndType, CreateStaffAccount);

module.exports = {StaffRoute};
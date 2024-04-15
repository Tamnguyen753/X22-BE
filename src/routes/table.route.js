const express = require("express");
const { createTable, getFreeTable } = require("../controler/table.controller");
const { verifyToken, verifyStaff, verifyManager } = require("../middleware/auth.middleware");
const tableRoute = express.Router();

tableRoute.post('/createTable',verifyToken,verifyManager ,createTable)
tableRoute.get('/getFreeTable',verifyToken,verifyStaff,getFreeTable)

module.exports = tableRoute;
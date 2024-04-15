const express = require("express");
const { createTable, getTable } = require("../controler/table.controller");
const { verifyManager } = require("../middleware/auth.middleware");
const { verifyToken } = require("../ultils/functions");
const tableRoute = express.Router();

tableRoute.post('/createTable', verifyToken, verifyManager, createTable)
tableRoute.get('/getTable', verifyToken, verifyManager, getTable)

module.exports = tableRoute;
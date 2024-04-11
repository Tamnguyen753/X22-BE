const express = require("express");
const { createTable } = require("../controler/table.controller");
const tableRoute = express.Router();

tableRoute.post('/createTable', createTable)

module.exports = tableRoute;
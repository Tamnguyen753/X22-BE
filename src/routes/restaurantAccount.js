const express = require("express");
const restaurantRoute = express.Router();

const {registerRestaurant, loginRestaurant, getRestaurant} = require("../controler/restaurantAccount");
const {verifyTokenRestaurant} = require("../middleware/restaurant");

restaurantRoute.get('/', verifyTokenRestaurant, getRestaurant);
restaurantRoute.post('/registerRestaurant', registerRestaurant);
restaurantRoute.post('/loginRestaurant', loginRestaurant);

module.exports = {restaurantRoute};
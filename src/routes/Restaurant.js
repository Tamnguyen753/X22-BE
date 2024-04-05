const express = require('express');

const RestaurantRoute = express.Router();

const {CreateRestaurant, UpdateRestaurant, DeleteRestaurant, GetRestaurant} = require('../controler/restaurantInfo');
const { checkTokenAndType } = require('../middleware/CheckTokenAndType');

RestaurantRoute.post("/", checkTokenAndType, CreateRestaurant);

RestaurantRoute.put('/:id', checkTokenAndType, UpdateRestaurant);

RestaurantRoute.delete('/:id', checkTokenAndType, DeleteRestaurant);
RestaurantRoute.get("/:id", GetRestaurant);

module.exports = {RestaurantRoute};
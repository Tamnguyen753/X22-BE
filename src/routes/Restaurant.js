const express = require('express');

const RestaurantRoute = express.Router();

const {checkTokenAndType} = require('../middleware/CheckTokenAndType');

const {CreateRestaurant, UpdateRestaurant, DeleteRestaurant, GetRestaurant} = require('../controler/restaurantInfo');
const upload = require("../middleware/uploadImage");

RestaurantRoute.use(checkTokenAndType);

RestaurantRoute.post("/", upload.array("images", 10), CreateRestaurant);

RestaurantRoute.put('/:id', checkTokenAndType, UpdateRestaurant);

RestaurantRoute.delete('/:id', checkTokenAndType, DeleteRestaurant);

RestaurantRoute.get("/:id", GetRestaurant);

module.exports = {RestaurantRoute};
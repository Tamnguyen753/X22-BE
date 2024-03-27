const express = require('express');

const RestaurantRoute = express.Router();
// const {verifyToken} = require('../middleware/auth');
// const {checkManagerType} = require('../middleware/TypeManager');

// const {checkTokenAndType} = require('../middleware/CheckTokenAndType');

const {verifyTokenRestaurant} = require("../middleware/restaurant");
const {CreateRestaurant, UpdateRestaurant, DeleteRestaurant, GetRestaurant} = require('../controler/restaurantInfo');
const upload = require("../middleware/uploadImage");

RestaurantRoute.use(verifyTokenRestaurant);

RestaurantRoute.post("/", upload.single("image"), CreateRestaurant);

RestaurantRoute.put('/:id', verifyTokenRestaurant, UpdateRestaurant);

RestaurantRoute.delete('/:id', verifyTokenRestaurant, DeleteRestaurant);

RestaurantRoute.get("/:id", GetRestaurant);

module.exports = {RestaurantRoute};
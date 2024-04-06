const express = require('express');

const restaurantRoute = express.Router();

const { CreateRestaurant, UpdateRestaurant, DeleteRestaurant, GetRestaurant } = require('../controler/restaurant.controller');
const { checkTokenAndType } = require('../middleware/CheckTokenAndType');

// quản lý nhà hàng đăng ký thông tin nhà hàng
restaurantRoute.post("/", checkTokenAndType, CreateRestaurant);

// quản lý nhà hàng cập nhật thông tin nhà hàng
restaurantRoute.put('/:id', checkTokenAndType, UpdateRestaurant);

// lấy danh sách nhà hàng
restaurantRoute.get("/", () => { });

// lấy thông tin chi tiết nhà hàng
restaurantRoute.get("/:id", GetRestaurant);

// restaurantRoute.delete('/:id', checkTokenAndType, DeleteRestaurant);

module.exports = { restaurantRoute };

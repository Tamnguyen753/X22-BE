const express = require('express');

const restaurantRoute = express.Router();

const { createRestaurant, updateRestaurant, getRestaurants, getRestaurant } = require('../controler/restaurant.controller');
const { verifyToken, verifyManager } = require("../middleware/auth.middleware");

// quản lý nhà hàng đăng ký thông tin nhà hàng
restaurantRoute.post("/", verifyToken, verifyManager, createRestaurant);

// quản lý nhà hàng cập nhật thông tin nhà hàng
restaurantRoute.put('/:id', verifyToken, verifyManager, updateRestaurant);

// lấy danh sách nhà hàng
restaurantRoute.get("/", getRestaurants);

// lấy thông tin chi tiết nhà hàng
restaurantRoute.get("/:id", getRestaurant);

// restaurantRoute.delete('/:id', checkTokenAndType, DeleteRestaurant);

module.exports = { restaurantRoute };

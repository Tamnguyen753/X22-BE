const { default: mongoose } = require("mongoose");
const { restaurantModel } = require("../models/restaurant")

const getRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantModel.find()
        res.status(201).send({
            message: "Thành công!",
            data: restaurant
        })
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurantId = String(req.params.id);
        const restaurant = await restaurantModel.findById(restaurantId)
        res.status(201).send({
            message: "Thành công !",
            data: restaurant
        })
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
}
module.exports = { getRestaurant, getRestaurantById };
const { Router } = require("express");
const { getRestaurant, getRestaurantById } = require("../controler/auth-controller");

const authRouter = Router();
authRouter.get("/getRestaurant", getRestaurant)
authRouter.get("/getRestaurant/:id", getRestaurantById)

module.exports = { authRouter };
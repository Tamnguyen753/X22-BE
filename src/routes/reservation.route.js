const { Router } = require("express");
const { verifyToken, verifyManager } = require("../middleware/auth.middleware");
const { userCreateReservation } = require("../controler/reservation.controller");

const reservationRoute = Router();

reservationRoute.post("/userCreateReservation", userCreateReservation);

module.exports = { reservationRoute };
const { Router } = require("express");
const { verifyToken, verifyManager } = require("../middleware/auth.middleware");
const { userCreateReservation, staffGetReservations, userGetReservations, staffCreateReservation, staffAcceptReservation, staffCancelReservation, staffCheckInReservation, staffCheckoutReservation } = require("../controler/reservation.controller");

const reservationRoute = Router();

reservationRoute.post("/userCreateReservation", userCreateReservation);
reservationRoute.get("/:id", staffGetReservations)
reservationRoute.get("/:id", userGetReservations)
reservationRoute.post("/staffCreateReservation", verifyToken, verifyManager, staffCreateReservation)
reservationRoute.post("/accept-reservation/:reservationId", verifyToken, verifyManager, staffAcceptReservation)
reservationRoute.post("/reject-reservation/:reservationId", verifyToken, verifyManager, staffCancelReservation)
reservationRoute.post("/checkin-reservation/:reservationId", verifyToken, verifyManager, staffCheckInReservation)
reservationRoute.post("/checkout-reservation/:reservationId", verifyToken, verifyManager, staffCheckoutReservation)
module.exports = { reservationRoute };
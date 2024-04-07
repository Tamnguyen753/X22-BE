const { isValidObjectId } = require("mongoose");
const { messages } = require("../constants/messages");
const { reservationModel } = require("../models/reservation.model");

// khách hàng đặt bàn trên hệ thống
const userCreateReservation = async (req, res) => {
    try {
        const {
            name,
            phone,
            quantity,
            reservationDate,
            restaurantId,
            menus
        } = req.body;

        const reservation = await reservationModel.create({
            name,
            phone,
            quantity,
            reservationDate,
            restaurantId,
            menus
        });

        res.status(201).json({
            success: true,
            message: messages.success,
            data: reservation
        });
        console.log(reservationDate);
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            success: false,
            message: messages.serverError,
        });
    }
}

// khách hàng lấy danh sách yêu cầu đặt bàn
const userGetReservations = () => {

}

// nhân viên lấy danh sách yêu cầu đặt bàn
const staffGetReservations = () => {

}

// nhân viên đặt bàn hộ khách
const staffCreateReservation = () => {

}

// nhân viên xác nhận yêu cầu đặt bàn
const staffAcceptReservation = () => {

}

// nhân viên hủy yêu cầu đặt bàn
const staffCancelReservation = () => {

}

// nhân viên checkin cho khách
const staffCheckInReservation = () => {

}

// nhân viên checkout cho khách
const staffCheckoutReservation = () => {

}

module.exports = {
    userCreateReservation,
    userGetReservations,
    staffGetReservations,
    staffCreateReservation,
    staffAcceptReservation,
    staffCancelReservation,
    staffCheckInReservation,
    staffCheckoutReservation
}
const { isValidObjectId } = require("mongoose");
const { messages } = require("../constants/messages");
const { reservationModel } = require("../models/reservation.model");
const { tableModel } = require("../models/table.model");

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
const userGetReservations = async (req, res) => {
    // try {
    //     const userId = req.params.id;
    //     const reservation = reservationModel.findById(userId)
    //     if (!reservation)
    //         return res.status(404).json({
    //             success: false,
    //             message: messages.restaurantNotFound
    //         });

    //     return res.status(201).send({
    //         message: messages.success,
    //         data: reservations
    //     })
    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).send({
    //         message: messages.serverError
    //     })
    // }
}

// nhân viên lấy danh sách yêu cầu đặt bàn
const staffGetReservations = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        console.log(restaurantId);
        if (!isValidObjectId(restaurantId))
            return res.status(400).json({
                success: false,
                message: messages.invalidData
            });
        const reservations = await reservationModel.findById(restaurantId)
        console.log(reservations);
        console.log(typeof restaurantId);
        if (!reservations)
            return res.status(404).json({
                success: false,
                message: messages.reservationNotFound
            });

        return res.status(201).send({
            message: messages.success,
            data: reservations
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: messages.serverError
        })
    }
}

// nhân viên đặt bàn hộ khách
const staffCreateReservation = async (req, res) => {
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

// nhân viên xác nhận yêu cầu đặt bàn
const staffAcceptReservation = async (req, res) => {
    const reservationId = req.params.reservationId
    try {

        // Tìm đặt bàn dựa trên reservationId
        const reservation = await reservationModel.findById(reservationId);

        // Kiểm tra xem đặt bàn có tồn tại không
        if (!reservation) {
            console.log("Không tìm thấy đặt bàn.");
            return res.status(400).json({ success: false, message: messages.reservationNotFound })
        }

        // Kiểm tra xem đặt bàn đã được chấp nhận hay chưa
        if (reservation.status === "accepted") {
            console.log("Đặt bàn đã được chấp nhận trước đó.");
            return res.status(400).json({ success: false, message: messages.failReservation })
        }

        // Cập nhật trạng thái của đặt bàn thành "accepted" và thời gian chấp nhận
        reservation.status = "accepted";
        reservation.acceptedDate = new Date();
        reservation.rejectedDate = null
        // Lưu thay đổi vào cơ sở dữ liệu
        await reservation.save();

        console.log("Đặt bàn đã được chấp nhận thành công.");
        // res.status(201).json(reservation)
        return res.status(400).json({ success: true, message: messages.success, data: reservation })
    } catch (error) {
        console.error("Lỗi khi xác nhận đặt bàn:", error);
        return false;
    }
}

// nhân viên hủy yêu cầu đặt bàn
const staffCancelReservation = async (req, res) => {
    try {
        // Lấy reservationId từ yêu cầu HTTP
        const reservationId = req.params.reservationId;

        // Tìm đặt bàn dựa trên reservationId
        const reservation = await reservationModel.findById(reservationId);

        // Kiểm tra xem đặt bàn có tồn tại không
        if (!reservation) {
            return res.status(404).json({
                success: false,
                messages: messages.reservationNotFound
            });
        }

        // Kiểm tra xem đặt bàn đã được hủy trước đó hay không
        if (reservation.status === "rejected") {
            return res.status(400).json({
                success: false,
                message: "Đặt bàn đã được hủy trước đó."
            });
        }

        // Cập nhật trạng thái của đặt bàn thành "cancelled" và thời gian hủy
        reservation.status = "rejected";
        reservation.rejectedDate = new Date();
        reservation.acceptedDate = null

        // Lưu thay đổi vào cơ sở dữ liệu
        await reservation.save();

        return res.status(200).json({
            success: true,
            message: messages.success
        });
    } catch (error) {
        console.error("Lỗi khi hủy đặt bàn:", error);
        return res.status(500).json({
            success: false,
            message: messages.serverError
        });
    }
}

// nhân viên checkin cho khách
const staffCheckInReservation = async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const tableIds = req.body.tableIds;

        // Tìm đặt bàn dựa trên reservationId
        const reservation = await reservationModel.findById(reservationId);

        // Kiểm tra xem đặt bàn có tồn tại không
        if (!reservation) {
            console.log("Không tìm thấy đặt bàn.");
            return res.status(400).json({
                success: false,
                message: messages.reservationNotFound
            });
        }
        // kiểm tra xem đã hủy chưa
        if (reservation.status === "rejected") {
            return res.status(400).json({
                success: false,
                message: "Đặt bàn đã được hủy trước đó."
            });
        }
        // kiểm tra xem đã xác nhận chưa
        if (reservation.status === "pending") {
            return res.status(400).json({
                success: false,
                message: "Đặt bàn chưa được xác nhận."
            });
        }
        // Kiểm tra xem đặt bàn đã được check-in trước đó hay chưa
        if (reservation.status === "checkIn") {
            console.log("Đặt bàn đã được check-in trước đó.");
            return res.status(400).json({
                success: false,
                message: messages.AvaiableCheckin
            });
        }
        if (!tableIds || tableIds.length === 0) {
            console.log("Vui lòng chọn ít nhất một bàn ăn.");
            return false;
        }
        // Cập nhật trạng thái của đặt bàn thành "checkIn" và thời gian check-in
        reservation.status = "checkIn";
        reservation.checkInDate = new Date();
        reservation.tables = tableIds;
        // Lưu thay đổi vào cơ sở dữ liệu
        await reservation.save();
        // Cập nhật trạng thái của các bàn ăn tương ứng với restaurantId
        await tableModel.updateMany({ _id: { $in: tableIds } }, { status: 'inuse' });
        return res.status(200).json({
            success: true,
            message: messages.success,
            data: reservation
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: messages.serverError
        });
    }
}

// nhân viên checkout cho khách
const staffCheckoutReservation = async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        // Tìm đặt bàn dựa trên reservationId
        const reservation = await reservationModel.findById(reservationId);

        // Kiểm tra xem đặt bàn có tồn tại không
        if (!reservation) {
            console.log("Không tìm thấy đặt bàn.");
            return res.status(400).json({
                success: false,
                message: messages.reservationNotFound
            });
        }

        // Kiểm tra xem đặt bàn có đang ở trạng thái check-in hay không
        if (reservation.status !== "checkIn") {
            console.log("Đặt bàn không ở trạng thái check-in.");
            return res.status(400).json({
                success: false,
                message: "Đặt bàn không ở trạng thái check-in."
            });
        }

        // Cập nhật trạng thái của đặt bàn thành "checkOut" và thời gian check-out
        reservation.status = "checkOut";
        reservation.checkOutDate = new Date();

        // Lưu thay đổi vào cơ sở dữ liệu
        await reservation.save();
        // Cập nhật trạng thái của các bàn ăn tương ứng với reservation.tables về 'free'
        await tableModel.updateMany({ _id: { $in: reservation.tables } }, { status: 'free' });

        console.log("Đặt bàn đã được check-out thành công.");
        return res.status(200).json({
            success: true,
            message: messages.success,
            data: reservation
        });
    } catch (error) {
        console.error("Lỗi khi check-out đặt bàn:", error);
        return false;
    }
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
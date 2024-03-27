const {Schema, default: mongoose} = require('mongoose');
const reservationSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    quantity: Number,
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "checkIn", "checkOut"],
        default: "pending",
    },
    reservationDate: Date,
    acceptedDate: Date,
    rejectedDate: Date,
    checkInDate: Date,
    checkOutDate: Date,
    tables: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "tables",
        },
    ],
    restaurantId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "restaurants",
        require: true,
    },
    menu: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "menu",
        },
    ],
});
const reservationModel = mongoose.model("reservations", reservationSchema);
module.exports = reservationModel;

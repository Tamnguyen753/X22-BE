const { Schema, default: mongoose } = require('mongoose');
const reservationSchema = new mongoose.Schema({
    userId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
    },
    name: String,
    phone: String,
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
    // time:String,
    checkOutDate: Date,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants",
        require: true,
    },
    tables: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "tables",
        },
    ],

    menus: [
        {
            menuId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "menu"
            },
            quantity: Number,
            price: Number,
            discount: Number,
            total: Number
        }
    ],
});
const reservationModel = mongoose.model("reservations", reservationSchema);
module.exports = { reservationModel };

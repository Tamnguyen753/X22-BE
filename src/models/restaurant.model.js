const { Schema, default: mongoose } = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staff",
    },
    name: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false
    },
    describe: String,
    image: Array,
    avgRate: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    viewCount: Number,
    rateCount: Number,
    openTime: String,
    closeTime: String
})
const restaurantModel = mongoose.model("restaurants", restaurantSchema)
module.exports = { restaurantModel };
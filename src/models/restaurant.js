const {Schema, default: mongoose} = require('mongoose');

const restaurantSchema = new Schema({
    managerId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "staff",
    },

    name: {
        type: String,
    },
    address: {
        type: String,
    },
    describe: String,
    images: Array,
    rate: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    viewCount : Number,
    rateCount: Number,
})
const restaurantModel = mongoose.model("restaurants", restaurantSchema)
module.exports = restaurantModel;

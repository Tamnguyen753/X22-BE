const {Schema, default: mongoose} = require('mongoose');
const {restaurantAccountSchema} = require("./restaurantAccount");

const restaurantSchema = new Schema({
    manager: {
        type: restaurantAccountSchema,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    describe: String,
    image: Array,
    rate: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const restaurantModel = mongoose.model("restaurants", restaurantSchema)
module.exports = restaurantModel;
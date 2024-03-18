const {Schema, default: mongoose} = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
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
module.exports = {restaurantModel};
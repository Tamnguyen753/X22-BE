const { Schema, default: mongoose } = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: String,
    type: {
        type: String,
        enum: ["food", "drink", "combo"],
        default: "food",
    },
    price: Number,
    unit: String,
    describe: String,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants",
        require: true,
    },
    discount: Number,
    image: String
})
const menuModel = mongoose.model("menu", menuSchema)
module.exports = { menuModel };
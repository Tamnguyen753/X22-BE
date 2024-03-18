const {Schema, default: mongoose} = require('mongoose');
const tableSchema = new mongoose.Schema({
    no: Number,
    status: {
        type: String,
        enum: ['free', 'inuse'],
        default: 'free'
    },
    restaurantId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "restaurants",
        require: true
    }
})
const tableModel = mongoose.model("tables", tableSchema)
module.exports = {tableModel};
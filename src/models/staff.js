const {Schema, default: mongoose} = require('mongoose');
const staffSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    dateOfBirth: Date,
    staffCode: String,
    restaurantId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "restaurants",
        require: true
    },
    username: String,
    password: String,
    type: {
        type: String,
        enum: ["staff", "manager"],
        default: "staff",
    },
})
const staffModel = mongoose.model("staff", staffSchema)
module.exports = staffModel;
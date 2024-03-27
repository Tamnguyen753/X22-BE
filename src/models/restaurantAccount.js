const {Schema, default: mongoose} = require('mongoose');

const restaurantAccountSchema = new Schema({
    username:{
        type: String,
    },
    password: {
        type: String,
    },
})
const restaurantAccountModel = mongoose.model("restaurantAccounts", restaurantAccountSchema)
module.exports = restaurantAccountModel;
module.exports = {restaurantAccountSchema};
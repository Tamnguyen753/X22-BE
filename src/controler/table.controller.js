const { messages } = require("../constants/messages");
const { menuModel } = require("../models/menu.model");
const { tableModel } = require("../models/table.model");

const createTable = async (req, res) => {
    const { no, restaurantId } = req.body;
    try {
        const table = await tableModel.create({ no, restaurantId })
        res.status(201).send({
            message: messages.success,
            data: table
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: messages.serverError })
    }
}
module.exports = { createTable };
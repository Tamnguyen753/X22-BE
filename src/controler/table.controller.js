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
const getTable = async (req, res) => {
    const { restaurantId } = req.query;


    try {
        // Tìm danh sách bàn ăn dựa trên restaurantId
        const tables = await tableModel.find({ restaurantId });

        // Trả về danh sách bàn ăn
        res.status(200).json({ success: true, data: tables });
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy danh sách bàn ăn:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi lấy danh sách bàn ăn' });
    }
}
module.exports = { createTable, getTable };
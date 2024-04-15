const { messages } = require("../constants/messages");
const { menuModel } = require("../models/menu.model");
const { tableModel } = require("../models/table.model");

const createTable = async (req, res) => {
  const { no } = req.body;
  const restaurantId = req.staff.restaurantId.toString();
  try {
    const table = await tableModel.create({ no, restaurantId });
    res.status(201).send({
      message: messages.success,
      data: table,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: messages.serverError });
  }
};
const getFreeTable = async (req, res) => {
  try {
    const restaurantId = req.staff.restaurantId.toString();
    const listFreeTable = await tableModel.find({restaurantId, status: "free" });
    if (!listFreeTable) {
      return res.status(404).json({
        success: false,
        message: "không tìm thấy bàn trống",
      });
    }
    return res.status(200).json({
      success: true,
      message: messages.success,
      data: listFreeTable,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: messages.serverError,
    });
  }
};
module.exports = { createTable,getFreeTable };

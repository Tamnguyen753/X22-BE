const { isValidObjectId } = require("mongoose");
const { messages } = require("../constants/messages");
const { menuModel } = require("../models/menu.model");

const getMenus = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        if (!isValidObjectId(restaurantId))
            return res.status(400).json({
                success: false,
                message: messages.invalidData
            });

        const menus = await menuModel.find({ restaurantId: restaurantId })
        res.json({ data: menus });
    } catch (error) {
        res.status(500).send({
            message: messages.serverError
        })
    }
}

const createMenu = async (req, res) => {
    const { name, type, price, unit, restaurantId, discount, describe, image } = req.body;
    try {
        const menu = await menuModel.create({ name, type, price, unit, restaurantId, discount, describe, image })
        res.status(201).send({
            message: messages.success,
            data: menu
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: messages.serverError })
    }
}

const updateMenu = async (req, res) => {
    const menuId = req.params.id;

    if (!isValidObjectId(menuId))
        return res.status(400).json({
            success: false,
            message: messages.invalidData
        });

    try {
        const { name, type, price, unit, restaurantId, discount, describe, image } = req.body;
        const menu = await menuModel.findByIdAndUpdate(menuId, { name, type, price, unit, restaurantId, discount, describe, image });
        res.status(201).send({
            message: messages.success,
            data: menu
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: messages.serverError })
    }
}

module.exports = { getMenus, createMenu, updateMenu }
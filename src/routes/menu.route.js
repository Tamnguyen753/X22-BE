const { Router } = require("express");
const { verifyToken, verifyManager } = require("../middleware/auth.middleware");
const { getMenus, createMenu, updateMenu } = require("../controler/menu.controller");

const menuRoute = Router();

// lấy danh sách menu
menuRoute.get("/", getMenus);

// tạo mới menu
menuRoute.post("/", verifyToken, verifyManager, createMenu);

// cập nhật menu
menuRoute.put("/:id", verifyToken, verifyManager, updateMenu);

module.exports = { menuRoute };
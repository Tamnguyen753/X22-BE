const express = require("express");
const staffRoute = express.Router();

const {
  Register,
  Login,
  GetStaff,
  createStaffAccount,
  getAllStaff,
} = require("../controler/staff.controller");
// const { verifyToken } = require('../middleware/auth');
// const { checkTokenAndType } = require("../middleware/CheckTokenAndType");
const { verifyManager, verifyToken } = require("../middleware/auth.middleware");

// staffRoute.get("/", verifyToken, GetStaff); // lấy thông tin của quản lý/nhân viên đang đăng nhập

// quản lý nhà hàng lấy danh sách nhân viên của nhà hàng
staffRoute.get("/", verifyToken, verifyManager, getAllStaff);

// quản lý nhà hàng tạo tài khoản cho nhân viên
staffRoute.post("/", verifyToken, verifyManager, createStaffAccount);

// quản lý nhà hàng cập nhật tài khoản nhân viên
staffRoute.put("/:id", verifyToken, verifyManager, createStaffAccount);

module.exports = { staffRoute };

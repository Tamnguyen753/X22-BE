const express = require('express');
const staffRoute = express.Router();

const { Register, Login, GetStaff, CreateStaffAccount } = require('../controler/staff.controller');
// const { verifyToken } = require('../middleware/auth');
const { checkTokenAndType } = require('../middleware/CheckTokenAndType');

// StaffRoute.post("/registerStaff", Register); // quản lý nhà hàng đăng ký tài khoản
// StaffRoute.post("/loginStaff", Login); // quản lý nhà hàng + nhân viên đăng nhập
// staffRoute.get("/", verifyToken, GetStaff); // lấy thông tin của quản lý/nhân viên đang đăng nhập

// quản lý nhà hàng lấy danh sách nhân viên của nhà hàng
staffRoute.get("/", () => { })

// quản lý nhà hàng tạo tài khoản cho nhân viên
staffRoute.post("/", checkTokenAndType, CreateStaffAccount);

// quản lý nhà hàng cập nhật tài khoản nhân viên
staffRoute.put("/:id", checkTokenAndType, CreateStaffAccount);

module.exports = { staffRoute };

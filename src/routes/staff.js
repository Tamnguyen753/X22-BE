const express = require('express');
const StaffRoute = express.Router();

const { Register, Login, GetStaff, CreateStaffAccount } = require('../controler/staffAccount');
const { verifyToken } = require('../middleware/auth');
const { checkTokenAndType } = require('../middleware/CheckTokenAndType');

StaffRoute.post("/registerStaff", Register); // quản lý nhà hàng đăng ký tài khoản
StaffRoute.post("/loginStaff", Login); // quản lý nhà hàng + nhân viên đăng nhập
StaffRoute.get("/", verifyToken, GetStaff); // lấy thông tin của quản lý/nhân viên đang đăng nhập
StaffRoute.post("/createStaffAccount", checkTokenAndType, CreateStaffAccount); // quản lý nhà hàng tạo tài khoản cho nhân viên

module.exports = { StaffRoute };
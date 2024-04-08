const { Router } = require("express");
const { login, forgetPassword, resetPassword, profile, managerRegister, customerRegister } = require("../controler/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const authRoute = Router();
// authRoute.get("/getRestaurant", getRestaurant)
// authRoute.get("/getRestaurant/:id", getRestaurantById)

// người dùng đăng nhập
authRoute.post("/login", login);

// người dùng quên mật khẩu
authRoute.post("/forgetPassword", forgetPassword);

// người dùng đặt lại mật khẩu
authRoute.post("/resetPassword", resetPassword);

// lấy thông tin của người dùng đăng nhập
authRoute.get("/profile", verifyToken, profile);

// quản lý nhà hàng đăng ký tài khoản
authRoute.post("/managerRegister", managerRegister);

// khách hàng đăng ký đăng ký tài khoản
authRoute.post("/customerRegister", customerRegister);

module.exports = { authRoute };

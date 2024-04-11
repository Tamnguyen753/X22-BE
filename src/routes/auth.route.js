const { Router } = require("express");
const { login, forgetPassword, resetPassword, profile, managerRegister, customerRegister } = require("../controler/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { postComment, getCommentByRestaurantId } = require("../controler/user.controller");

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

//khách hàng đánh giá nhà hàng
authRoute.post("/comment", postComment)
authRoute.get("/comment/:restaurantId", getCommentByRestaurantId)

module.exports = { authRoute };

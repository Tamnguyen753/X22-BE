const { Router } = require("express");
const {
  resetPassword,
  forgetPassword,
  login,
  register,
} = require("../controler/user-controller");

const userRouter = Router();

// userRouter.post("/register", register);
// userRouter.post("/login", login);
// userRouter.get("/forgetpassword", forgetPassword);
// userRouter.put("/resetpassword", resetPassword);

module.exports = userRouter;


const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getToken } = require("../ultils/token.js");
const { userModel } = require("../models/user.model.js");
const commentModel = require("../models/comment.model.js");

const register = async (req, res, next) => {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();
    const firstName = req.body.firstName?.trim();
    const lastName = req.body.lastName?.trim();
    const email = req.body.email?.trim();
    const phone = req.body.phone?.trim();
    const salt = bcrypt.genSaltSync();
    const error = {};
    if (!username) {
      error.username = "Tài khoản bắt buộc nhập";
    } else {
      const currentUser = await userModel.findOne({ username });
      if (!!currentUser) {
        error.username = "Tài khoản đã tồn tại";
      }
    }
    if (!password) {
      error.password = "Mật khẩu bắt buộc nhập";
    }
    if (!firstName) {
      error.firstName = "Họ bắt buộc nhập";
    }
    if (!lastName) {
      error.lastName = "Tên bắt buộc nhập";
    }
    if (!email) {
      error.email = "Email bắt buộc nhập";
    }
    if (!phone) {
      error.phone = "Số điện thoại bắt buộc nhập";
    }
    if (Object.keys(error).length > 0) {
      res.status(400).send(error);
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await userModel.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      phone,
    });
    res.status(201).send({
      message: "Đăng ký thành công",
      data: newUser,
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Tên đăng nhập và mật khẩu là bắt buộc" });
    }

    const existedUser = await userModel.findOne({ username });
    if (!existedUser) {
      return res.status(404).send({ message: "Tên đăng nhập không tồn tại" });
    }

    const matched = bcrypt.compareSync(password, existedUser.password);
    if (!matched) {
      return res.status(401).send({ message: "Mật khẩu không đúng" });
    }

    return res.status(200).send({
      message: "Đăng nhập thành công",
      data: getToken({
        id: existedUser.id,
      }),
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    return res.status(500).send({ message: "Đã xảy ra lỗi khi đăng nhập" });
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const username = req.body.username?.trim();
    if (!username) {
      return res.status(400).send({ message: "Tên đăng nhập là bắt buộc" });
    }

    const findUser = await userModel.findOne({ username });
    if (!findUser) {
      return res.status(404).send({
        message: `${username} không tồn tại`,
      });
    }
    const resetToken = getToken({ email: findUser.email });
    const message1 = `http://localhost:3001/resetpassword?token=${resetToken}`;
    await sendEmail(findUser.email, "lấy lại mật khẩu", message1);
    return res.status(200).send({
      message: "Hãy kiểm tra email của bạn",
      data: getToken({ email: findUser.email }),
    });
  } catch (error) {
    res.status(500).send({
      message: ("Error in forgetPassword:", error),
    });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "maivannam27061999@gmail.com",
    pass: process.env.PM,
  },
});
const sendEmail = async (email, subject, message) => {
  try {
    await transporter.sendMail({
      from: "maivannam27061999@gmail.com",
      to: email,
      subject: subject,
      text: message,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SC);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const resetPassword = async (req, res, next) => {
  const token = req.query.token;
  const { newPassword } = req.body;
  const decodedToken = verifyToken(token);
  try {
    const user = await userModel.findOne({ email: decodedToken.email });
    if (!user) {
      return res.status(400).send({ message: "Token không hợp lệ" });
    } else {
      console.log(user);
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .send({ message: "Mật khẩu đã được cập nhật thành công" });
  } catch (error) {
    console.error("Lỗi khi reset mật khẩu:", error);
    return res.status(500).send({ message: "Lỗi máy nội bộ" });
  }
};

let comments = [];
const postComment = async (req, res) => {
  const { restaurantId, userID, comment, rating } = req.body;
  try {
    const newComment = await commentModel.create({ restaurantId, userID, comment, rating });
    comments.push(newComment);
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const getCommentByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params
    const comments = await commentModel.find({ restaurantId })
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error })
  }
}
module.exports = { register, login, forgetPassword, resetPassword, postComment, getCommentByRestaurantId };

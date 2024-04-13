const bcrypt = require("bcrypt");
const { staffModel } = require("../models/staff.model");
const jwt = require("jsonwebtoken");
const { messages } = require("../constants/messages");

const GetStaff = async (req, res) => {
  try {
    const staff = await staffModel.findById(req.staffId).select("-password");
    if (!staff) {
      res.status(400).json({ success: false, message: "staff not found!" });
    }
    res.json({ success: true, staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "interal server!" });
  }
};
const getAllStaff = async (req, res) => {
  const restaurantId = req.staff.restaurantId;

  if (!restaurantId) {
    return res
      .status(400)
      .json({ success: false, message: messages.managerHasNoRestaurant });
  }

  try {
    const listStaff = await staffModel
      .find({ restaurantId: restaurantId })
      .select("-password");

    res.json({ success: true, listStaff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: messages.serverError });
  }
};

//tao tai khoan nhan vien
const createStaffAccount = async (req, res) => {
  const { name, email, address, dateOfBirth, staffCode, username, password } =
    req.body;

  if (!name || !email || !staffCode || !username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn chưa điền đủ thông tin!" });
  }

  try {
    const staff = await staffModel.findOne({ username });

    if (staff) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản nhân viên đã tồn tại!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newStaff = new staffModel({
      name,
      email,
      address,
      dateOfBirth,
      staffCode,
      username,
      password: hashedPassword,
      type: "staff",
      restaurantId: req.staff.restaurantId
    });

    await newStaff.save();

    res.json({
      success: true,
      message: "Tạo tài khoản nhân viên thành công"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
  }
};
module.exports = { GetStaff, createStaffAccount, getAllStaff };

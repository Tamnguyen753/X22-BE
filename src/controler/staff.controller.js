const bcrypt = require("bcrypt");
const { staffModel } = require("../models/staff.model");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Bạn chưa điền đủ thông tin!" });
    }

    try {
        const staff = await staffModel.findOne({ username });

        if (staff) {
            return res
                .status(400)
                .json({ success: false, message: "Tên đăng ký đã tồn tại!" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newStaff = new staffModel({
            name,
            email,
            username,
            password: hashedPassword,
            type: "manager",
        });
        await newStaff.save();

        const accessToken = jwt.sign(
            { staffId: newStaff._id, type: newStaff.type },
            ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "Tạo tài khoản thành công!",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
    }
};

const Login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Bạn chưa nhập đủ thông tin!" });
    }

    try {
        const staff = await staffModel.findOne({ username });

        if (!staff) {
            return res.status(400).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu không chính xác!",
            });
        }

        const passworldValid = bcrypt.compareSync(password, staff.password);
        if (!passworldValid) {
            return res.status(400).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu không chính xác!",
            });
        }

        const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc";
        const accessToken = jwt.sign(
            { staffId: staff._id, type: staff.type },
            ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "Đăng nhập thành công!",
            accessToken,
            staff,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
    }
};

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
    const restaurantId = req.query.restaurantId;
    if (!restaurantId) {
        return res
            .status(400)
            .json({ success: false, message: "Vui lòng cung cấp restaurantId!" });
    }
    try {
        const listStaff = await staffModel
            .find({ restaurantId: restaurantId })
            .select("-password");
        if (!listStaff || listStaff.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Không tìm thấy nhân viên!" });
        }
        res.json({ success: true, listStaff });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi server nội bộ!" });
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
        });

        await newStaff.save();

        const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc";
        const accessToken = jwt.sign(
            { staffId: newStaff._id, type: "staff" },
            ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "Tạo tài khoản nhân viên thành công",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
    }
};
module.exports = { Register, Login, GetStaff, createStaffAccount, getAllStaff };

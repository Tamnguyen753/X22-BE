const jwt = require('jsonwebtoken');
const { messages } = require('../constants/messages');
const { loginType } = require('../constants/loginType');
const { staffModel } = require('../models/staff.model');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: messages.unauthenticated });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
        req.loginTypeValue = decoded.loginTypeValue;
        req.type = decoded.type;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: messages.unauthenticated });
    }
};

const verifyManager = async (req, res, next) => {
    if (req.type == "manager" && req.loginTypeValue == loginType.staffLogin) {
        // lấy thông tin nhân viên đăng nhập
        const staff = await staffModel.findById(req.id);
        req.staff = staff;
        next();
    }
    else return res.status(403).json({ success: false, message: messages.mustBeManager });
};

const verifyStaff = async (req, res, next) => {
    if (req.loginTypeValue == loginType.staffLogin) {
        // lấy thông tin nhân viên đăng nhập
        const staff = await staffModel.findById(req.id);
        req.staff = staff;
        next();
    }
    else return res.status(403).json({ success: false, message: messages.mustBeStaff });
};

module.exports = { verifyToken, verifyManager, verifyStaff };

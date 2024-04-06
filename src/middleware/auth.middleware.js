const jwt = require('jsonwebtoken');
const { messages } = require('../constants/messages');
const { loginType } = require('../constants/loginType');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: messages.invalidData });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
        req.loginTypeValue = decoded.loginTypeValue;
        req.type = decoded.type;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: messages.invalidData });
    }
};

const verifyManager = (req, res, next) => {
    if (req.type == "manager" && req.loginTypeValue == loginType.staffLogin) next();
    else return res.status(403).json({ success: false, message: messages.invalidData });
};

const verifyStaff = () => {
    if (req.loginTypeValue == loginType.staffLogin) next();
    else return res.status(403).json({ success: false, message: messages.invalidData });
};

module.exports = { verifyToken, verifyManager, verifyStaff };

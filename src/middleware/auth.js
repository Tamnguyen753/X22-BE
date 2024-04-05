const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.heaher('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({success: false, message: 'Xác thực không hợp lệ!'});
    }

    const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc"; //nen cho vao env
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.staffId = decoded.staffId;
        req.staffType = decoded.type;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({success:false, message: "Xác thực không hợp lệ!"});
    }
};

module.exports = {verifyToken};
const jwt = require("jsonwebtoken");

const verifyTokenRestaurant = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({success: false, message: "access token not found!"});
    }

    const ACCESS_TOKEN_SECRET = akjfksbmdvskmfbkswuigsc;
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.restaurantId = decoded.restaurantId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({success: false, message: "invalid token!"});
    }
};

module.exports = {verifyTokenRestaurant};
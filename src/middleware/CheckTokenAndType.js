const { checkManagerType } = require('./TypeManager');
// const {verifyToken} = require('./auth');

const checkTokenAndType = (req, res, next) => {
    verifyToken(req, res, (err) => {
        // if(err){
        //     return res.status(401).json({success: false, message: "Xác thực không hợp lệ!"});
        // }

        // checkManagerType(req, res, (err) => {
        //     if(err){
        //         return res.status(403).json({success:false, message: "Bạn không phải là quản lý!"});
        //     }

        //     next();
        // });
    });
}

module.exports = { checkTokenAndType };

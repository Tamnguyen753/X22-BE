const { checkManagerType } = require('./TypeManager');
const {verifyToken} = require('./auth');

const checkTokenAndType = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if(err){
            return res.status(401).json({success: false, message: "token not found!"});
        }

        checkManagerType(req, res, (err) => {
            if(err){
                return res.status(403).json({success:false, message: "you don't have type is manager!"});
            }

            next();
        });
    });
}

module.exports = {checkTokenAndType};
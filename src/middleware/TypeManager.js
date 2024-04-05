const checkManagerType = (req, res, next) => {
    if(req.staffType === 'manager'){
        next();
    }else{
        res.status(403).json({error: "Bạn không phải là quản lý của nhà hàng!"});
    }
}
module.exports = {checkManagerType};
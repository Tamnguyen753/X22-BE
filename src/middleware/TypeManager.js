const checkManagerType = (req, res, next) => {
    if(req.staffType === 'manager'){
        next();
    }else{
        res.status(403).json({error: "ban khong phai la quan li"});
    }
}
module.exports = {checkManagerType};
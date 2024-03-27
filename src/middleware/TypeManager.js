const checkManagerType = (req, res, next) => {
    const {type} = req.body.type;

    if(type === 'manager'){
        next();
    }else{
        res.status(403).json({error: "you don't have create Restaurant!"});
    }
}
module.exports = {checkManagerType};
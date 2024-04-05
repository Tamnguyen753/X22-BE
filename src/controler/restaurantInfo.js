const restaurantModel =  require("../models/restaurant");

const CreateRestaurant = async (req, res) => {
    const file = req.file;
        if(!file){
            return res.status(400).json({success: false, message: "Chưa có ảnh nào được tải lên!"});
        }

    const {name, address, describe, image} = req.body;

    if(!name || !address || !describe || !image) {
        return res.status(400).json({success: false, message: "Bạn chưa điền đủ thông tin!"});
    }

    try{
        const newRestaurant = new restaurantModel({
            name,
            address,
            describe,
            image: image,
            rate: 0,
            createdAt: new Date(),
            viewCount: 0,
            rateCount: 0,
        });

        await newRestaurant.save();

        res.json({success: true, message:"Tạo mới nhà hàng thành công!"});

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Lỗi hệ thống!"});
    }
};


const UpdateRestaurant = async (req, res) => {
    const {name, address, describe, image} = req.body;

    if(!name || !address || !describe || !image) {
        return res.status(404).json({success: false, message: "Nhà hàng không tồn tại!"});
    }

    
    try {
        const existingRestaurant = await restaurantModel.findById({_id: req.params.id});
        if(!existingRestaurant){
            return res.status(404).json({success: false, message: "Nhà hàng không tồn tại!"});
        }

        let updatedRestaurant = {
            name,
            address,
            describe,
            image
        }

        await restaurantModel.updateOne({_id: req.params.id}, updatedRestaurant);
        
        res.json({success: true, message: "Cập nhật thành công!", restaurant: updatedRestaurant});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Lỗi hệ thống!"});
    }
};

const DeleteRestaurant = async(req, res) => {
    try{
        const RestaurantDeleteCondition = {_id: req.params.id};

        const deleteRestaurant = await restaurantModel.findOneAndDelete(RestaurantDeleteCondition);

        if(!deleteRestaurant){
            return res.status(404).json({success:false, message: "Nhà hàng không tồn tại!"});
        }

        res.json({success: true, message: "Xoá thành công", restaurant: deleteRestaurant});
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Lỗi hệ thống!"});
    }
}

const GetRestaurant = async (req, res, next) => {
    try{
        const restaurantId =  req.params.id;
        const restaurant = await restaurantModel.findOne({_id: restaurantId});
        if(!restaurant){
            return res.status(404).json({success: false, message: "Nhà hàng không tồn tại!"});
        }
        res.json(restaurant);
    }catch(err){
        next(err);
    }
};

module.exports = {CreateRestaurant, UpdateRestaurant, DeleteRestaurant, GetRestaurant};
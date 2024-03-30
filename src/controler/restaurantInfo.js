const restaurantModel =  require("../models/restaurant");

const CreateRestaurant = async (req, res) => {
    const files = req.files;

        if(!files || files.length === 0){
            return res.status(400).json({success: false, message: "Chua co anh nao duoc tai len!"});
        }

    const { name, address, describe} = req.body;

    if(!name || !address || !describe ) {
        return res.status(400).json({success: false, message: "infomation is required!"});
    }

    try{
        const images = files.map(file => `posts/${file.filename}`);

        const newRestaurant = new restaurantModel({
            managerId: req.staffId,
            name,
            address,
            describe,
            // images: `posts/${file.filename}`,
            images: images,
            rate: 0,
            createdAt: new Date(),
            viewCount: 0,
            rateCount: 0,
        });

        await newRestaurant.save();

        res.json({success: true, message:"created restaurent successfully!"});

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "internal server!"});
    }

};


const UpdateRestaurant = async (req, res) => {

    const {name, address, describe, images, rate} = req.body;

    try {
        let updatedRestaurant = {
            name,
            address,
            describe,
            images,
            rate,
        }

        const existingRestaurant = await restaurantModel.findById({_id: req.params.id});
        
        if(!existingRestaurant){
            return res.status(404).json({success: false, message: "restaurant not found"});
        }

        await restaurantModel.updateOne({_id: req.params.id}, updatedRestaurant);

        res.json({success: true, message: "update successfully!", restaurant: updatedRestaurant});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "internal server!"});
    }
};

const DeleteRestaurant = async(req, res) => {
    try{
        const RestaurantDeleteCondition = {_id: req.params.id};

        const deleteRestaurant = await restaurantModel.findOneAndDelete(RestaurantDeleteCondition);

        if(!deleteRestaurant){
            return res.status(401).json({success:false, message: "restaurant not found!"});
        }

        res.json({success: true, message: "deleted successfully!", restaurant: deleteRestaurant});
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "internal server!"});
    }
}

const GetRestaurant = async (req, res, next) => {
    try{
        const restaurantId =  req.params.id;
        const restaurant = await restaurantModel.findOne({_id: restaurantId});
        if(!restaurant){
            return res.status(404).json({success: false, message: "restaurant not found"});
        }
        res.json(restaurant);
    }catch(err){
        next(err);
    }
};

module.exports = {CreateRestaurant, UpdateRestaurant, DeleteRestaurant, GetRestaurant};
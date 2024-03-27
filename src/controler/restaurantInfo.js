const restaurantModel =  require("../models/restaurant");

const CreateRestaurant = async (req, res, next) => {
    const file = req.file;
        if(!file){
            return res.status(400).json({success: false, message: "file is required!"});
        }

    const { name, address, describe} = req.body;

    if(!name || !address || !describe ) {
        return res.status(400).json({success: false, message: "infomation is required!"});
    }

    // res.json("ok");

    try{
        const manager = req.body;
        
        if(!manager){
            return res.status(401).json({success: false, message: "unauthorized"});
        }
        
        const newRestaurant = new restaurantModel({
            manager: manager,
            name,
            address,
            describe,
            image: `posts/${file.filename}`,
            rate: 0,
            createdAt: new Date()
        });

        await newRestaurant.save();

        res.json({success: true, message:"created restaurent successfully!"});

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "internal server!"});
    }

};


const UpdateRestaurant = async (req, res) => {

    const {name, address, describe, image, rate} = req.body;

    // if(!name || !address || !describe || !image) {
    //     return res.status(400).json({success: false, message: "infomation is required!"});
    // }

    try {
        let updatedRestaurant = {
            name,
            address,
            describe,
            image,
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
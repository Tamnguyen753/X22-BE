const restaurantModel =  require("../models/restaurant");

const CreateRestaurant = async (req, res) => {
    const file = req.file;
        if(!file){
            return res.status(400).json({success: false, message: "file is required!"});
        }

    const {name, address, describe, image} = req.body;

    if(!name || !address || !describe || !image) {
        return res.status(400).json({success: false, message: "infomation is required!"});
    }

    try{
        const newRestaurant = new restaurantModel({
            name,
            address,
            describe,
            image: `posts/${file.filename}`,
            rate,
            createdAt
        });

        await newRestaurant.save();

        res.json({success: true, message:"created restaurent successfully!"});

    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "internal server!"});
    }
};


const UpdateRestaurant = async (req, res) => {
    const {name, address, describe, image} = req.body;

    if(!name || !address || !describe || !image) {
        return res.status(400).json({success: false, message: "infomation is required!"});
    }

    try {
        let updatedRestaurant = {
            name,
            address,
            describe,
            image
        }
        const RestaurantUpdateCondition = {_id: req.params.id};

        if(!RestaurantUpdateCondition){
            return res.status(401).json({success: false, message: "update failed!"});
        }
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
module.exports = {CreateRestaurant, UpdateRestaurant, DeleteRestaurant};
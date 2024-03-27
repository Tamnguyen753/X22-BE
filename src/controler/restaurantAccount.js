const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const restaurantAccountModel = require("../models/restaurantAccount");

const registerRestaurant = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({success: false, message: "missing username or password!"});
    }

    try{
        const restaurant = await restaurantAccountModel.findOne({username});

        if(restaurant){
            return res.status(400).json({success: false, message: "restaurant already existing!"});
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);
        const newRestaurant = new restaurantAccountModel({username, password: hashedPassword});
        await newRestaurant.save();

        const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc";
        const accessToken = jwt.sign({restaurantId: newRestaurant._id}, ACCESS_TOKEN_SECRET);

        res.json({success: true, message: "restaurant created successfully!", accessToken});
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "internal server!"});
    }
};

const loginRestaurant = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({success: false, message: "missing username or password!"});
    }

    try {
        const restaurant = await restaurantAccountModel.findOne({username});

        if(!restaurant){
            return res.status(400).json({success: false, message: "restaurant not found!"});
        }

        const passworldValid = bcrypt.compareSync(password, restaurant.password);
        if(!passworldValid){
            return res.status(400).json({success: false, message: "incorrect username or password !"});
        }

        const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc";
        const accessToken = jwt.sign({restaurantId: restaurant._id}, ACCESS_TOKEN_SECRET);

        res.json({success: true, message:"login successfully!", accessToken});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "internal server!"});
    }
};

const getRestaurant = async(req, res) => {
    try {
        const restaurant = await restaurantAccountModel.findById(req.restaurantId).select('-password');
        if(!restaurant){
            return res.status(400).json({success: false, message:"restaurant not found!"});
        }
        res.json({success: true, restaurant});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "internal server!"});
    }
};

module.exports = {registerRestaurant, loginRestaurant, getRestaurant};
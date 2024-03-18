const bcrypt = require('bcrypt');
const staffModel = require("../models/staff");
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
    const {name, address, dateOfBirth, staffCode, username, password, type} = req.body;
    
    if(!name || !address || !dateOfBirth || !staffCode || !username || !password){
        return res.status(400).json({success: false, message: "information is required!"});
    }
    
    try{
        const staff = await staffModel.findOne({username});

        if(staff){
            return res.status(400).json({success: false, message: "staff already existing!"})
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newStaff = new staffModel({name, address, dateOfBirth, staffCode, username, password: hashedPassword, type});
        await newStaff.save();

        const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc";
        const accessToken = jwt.sign({staffId: newStaff._id, type: newStaff.type}, ACCESS_TOKEN_SECRET);

        res.json({success: true, message: "staff created successfully!", accessToken});
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server!'});
    }
};

const Login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({success: false, message: "missing username or password!"});
    }
    
    try {
        const staff = await staffModel.findOne({username});

        if(!staff){
            return res.status(400).json({success: false, message: "incorrect username or password!"});
        }

        const passworldValid = bcrypt.compareSync(password, staff.password);
        if(!passworldValid){
            return res.status(400).json({success: false, message: "incorrect username or password!"});
        }

        const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc";
        const accessToken = jwt.sign({staffId: staff._id, type: staff.type}, ACCESS_TOKEN_SECRET);

        res.json({success: true, message: "staff login is successfully!", accessToken});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "interal server!"});
    }   
};

const getStaff = async (req, res) => {
    try {
        const staff = await staffModel.findById(req.staffId).select('-password');
        if(!staff){
            res.status(400).json({success: false, message: "staff not found!"});
        }
        res.json({success: true, staff});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "interal server!"});
    }
};
module.exports = {Register, Login, getStaff};
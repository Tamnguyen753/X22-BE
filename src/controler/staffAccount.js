const bcrypt = require('bcrypt');
const staffModel = require("../models/staff");
const jwt = require('jsonwebtoken');

//register cua manager
const Register = async (req, res) => {
    const {name, email, username, password} = req.body;
    
    if(!name || !email || !username || !password){
        return res.status(400).json({success: false, message: "information is required!"});
    }
    
    try{
        const manager = await staffModel.findOne({username});

        if(manager){
            return res.status(400).json({success: false, message: "staff already existing!"})
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newManager = new staffModel({name, email, username, password: hashedPassword, type: "manager"});
        await newManager.save();

        const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc";
        const accessToken = jwt.sign({staffId: newManager._id, type: "manager"}, ACCESS_TOKEN_SECRET);

        res.json({success: true, message: "staff created successfully!", accessToken});
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server!'});
    }
};

//login cua staff (bao gom ca manager)
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


//tao tai khoan nhan vien
const CreateStaffAccount = async(req, res) => {
    const {name, email, address, dateOfBirth, staffCode, username, password } = req.body;

    if(!name || !email || !staffCode || !username || !password) {
       return res.status(400).json({success: false, message: "Thong tin bat buoc phai dien!"});
    }

    try {
        const staff = await staffModel.findOne({username});

        if(staff){
            return res.status(400).json({success: false, message: "tai khoan nhan vien da ton tai!"});
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newStaff = new staffModel({name, email, address, dateOfBirth, staffCode, username, password: hashedPassword, type: "staff"});

        await newStaff.save();

        const ACCESS_TOKEN_SECRET = "akjfksbmdvskmfbkswuigsc";
        const accessToken = jwt.sign({staffId: newStaff._id, type: "staff"}, ACCESS_TOKEN_SECRET);


        res.json({success: true, message: "tao tai khoan nhan vien thanh cong!", accessToken});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "loi he thong!"});
    }

}
module.exports = {Register, Login, getStaff, CreateStaffAccount};
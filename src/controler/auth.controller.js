const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models/user.model");
const { staffModel } = require("../models/staff.model");

const { messages } = require("../constants/messages");
const { loginType } = require("../constants/loginType")

const { sendEmail } = require("../ultils/functions");
const { request } = require("express");
const { restaurantModel } = require("../models/restaurant.model");
// const getRestaurant = async (req, res) => {
//     try {
//         const restaurant = await restaurantModel.find()
//         res.status(201).send({
//             message: "Thành công!",
//             data: restaurant
//         })
//     } catch (error) {
//         res.status(403).send({
//             message: error.message
//         })
//     }
// };

// const getRestaurantById = async (req, res) => {
//     try {
//         const restaurantId = String(req.params.id);
//         const restaurant = await restaurantModel.findById(restaurantId)
//         res.status(201).send({
//             message: "Thành công !",
//             data: restaurant
//         })
//     } catch (error) {
//         res.status(403).send({
//             message: error.message
//         })
//     }
// }


const login = async (req, res) => {
    const { username, password, loginTypeValue } = req.body;

    if (!username || !password || !loginTypeValue) {
        return res.status(400).json({ success: false, message: messages.invalidData });
    }

    try {
        let id = null;
        let type = null;
        if (loginTypeValue == loginType.staffLogin) {
            const staff = await staffModel.findOne({ username });

            if (!staff) {
                return res.status(400).json({ success: false, message: messages.usernameOrPasswordIncorrect });
            }

            id = staff._id.toString();
            type = staff.type;

            const passworldValid = bcrypt.compareSync(password, staff.password);
            if (!passworldValid) {
                return res.status(400).json({ success: false, message: messages.usernameOrPasswordIncorrect });
            }

        } else if (loginTypeValue == loginType.customerLogin) {
            const user = await userModel.findOne({ username });

            if (!user) {
                return res.status(400).json({ success: false, message: messages.usernameOrPasswordIncorrect });
            }

            id = user._id.toString();

            const passworldValid = bcrypt.compareSync(password, user.password);
            if (!passworldValid) {
                return res.status(400).json({ success: false, message: messages.usernameOrPasswordIncorrect });
            }

        }

        const accessToken = jwt.sign({ id, loginTypeValue, type }, process.env.JWT_SECRET);

        res.json({ success: true, message: messages.loginSuccessfully, accessToken });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: messages.serverError });
    }
}

const forgetPassword = async (req, res) => {
    try {
        const username = req.body.username?.trim();
        const email = req.body.email?.trim();
        const findUser = await userModel.findOne({ username, email });
        if (!username || !email) {
            return res.status(400).send({ message: messages.invalidData });
        }

        if (findUser && findUser.email !== email) {
            return res.status(200).send({
                message: messages.notFoundUsernameAndEmail,
            });
        }
        const resetToken = getToken({ email: findUser.email });
        const message1 = `${process.env.DOMAIN_WEB}/resetpassword?token=${resetToken}`;
        await sendEmail(findUser.email, "lấy lại mật khẩu", message1);
        return res.status(200).send({
            message: messages.resetPasswordEmailHasSent,
            data: getToken({ email: findUser.email }),
        });
    } catch (error) {
        return res.status(500).send({
            message: messages.serverError
        });
    }
};

const resetPassword = async (req, res) => {
    const token = req.query.token;
    const { newPassword } = req.body;
    const decodedToken = verifyToken(token);
    try {
        const user = await userModel.findOne({ email: decodedToken.email });
        if (!user) {
            return res.status(400).send({ message: messages.invalidData });
        } else {
            console.log(user);
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res
            .status(200)
            .send({ message: messages.resetPasswordSuccessfully });
    } catch (error) {
        return res.status(500).send({ message: messages.serverError });
    }
};

const profile = async (req, res) => {
    try {
        if (req.loginTypeValue == loginType.staffLogin) {
            const staff = await staffModel.findById(req.id).select('-password');
            if (!staff) {
                res.status(400).json({ success: false, message: messages.invalidData });
            }

            const restaurant = await restaurantModel.findById(staff.restaurantId);

            res.json({ success: true, staff, restaurant });
        } else if (request.loginTypeValue == loginType.customerLogin) {
            const user = await userModel.findById(req.id).select('-password');
            if (!user) {
                res.status(400).json({ success: false, message: messages.invalidData });
            }
            res.json({ success: true, user });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: messages.serverError });
    }
};

const managerRegister = async (req, res) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        return res.status(400).json({ success: false, message: messages.invalidData });
    }

    try {
        const staff = await staffModel.findOne({ username });

        if (staff) {
            return res.status(400).json({ success: false, message: messages.usernameHasBeenTaken })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newStaff = new staffModel({ name, email, username, password: hashedPassword, type: "manager" });
        await newStaff.save();


        const accessToken = jwt.sign({ staffId: newStaff._id, type: newStaff.type }, process.env.JWT_SECRET);

        res.json({ success: true, message: messages.registerSuccessfully, accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: messages.serverError });
    }
};

const customerRegister = async (req, res, next) => {
    try {
        const { username, password, firstName, lastName, email, phone } = req.body;
        if (!username || !password || !firstName || !lastName || !email || !phone)
            return res.status(400).json({ message: messages.invalidData });

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            phone,
        });
        return res.status(201).send({
            message: messages.registerSuccessfully,
            data: newUser,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: messages.serverError,
        });
    }
};

module.exports = {
    login,
    forgetPassword,
    resetPassword,
    profile,
    managerRegister,
    customerRegister
};

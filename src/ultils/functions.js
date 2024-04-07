const mongodb = require('mongodb');

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false,
    auth: {
        user: process.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
    },
});
const sendEmail = async (email, subject, message) => {
    try {
        await transporter.sendMail({
            from: process.SMPT_USER,
            to: email,
            subject: subject,
            text: message,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SC);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const isValidObjectId = (id) => {
    return mongodb.ObjectId.isValid(id);
}

module.exports = { transporter, sendEmail, verifyToken }

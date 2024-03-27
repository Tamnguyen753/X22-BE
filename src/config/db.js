const { default: mongoose } = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://nguyendactam0299:tam123456@cluster0.8n1qci6.mongodb.net/web_booking?retryWrites=true&w=majority&appName=Cluster0")
        return "connect to db ok!"
    } catch (error) {
        throw error
    }
}
module.exports = { connectDB };
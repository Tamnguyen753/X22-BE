const { default: mongoose } = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://chinhdv2511:Qbu6pauBymCNzodG@cluster0.g0ql4c9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        return "connect to db ok!"
    } catch (error) {
        throw error
    }
}
module.exports = { connectDB };

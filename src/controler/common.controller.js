const { isValidObjectId } = require("mongoose");
const { messages } = require("../constants/messages");
const multer = require("multer");
const { mongoose } = require("mongoose");
const { admin } = require("../config/firebase.config");
const { randomString } = require("../ultils/functions");

const imageSchema = new mongoose.Schema({
    imageUrl: Array
});
const Image = mongoose.model('Image', imageSchema);
const upload = multer({ storage: multer.memoryStorage() });

const uploadFile = async (req, res) => {
    const bucket = admin.storage().bucket();
    // Kiểm tra xem có file được gửi lên không
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const imageUrls = [];
    console.log(imageUrls);
    try {
        // Lặp qua từng file ảnh được gửi lên
        for (const file of req.files) {
            // Tạo đường dẫn của ảnh trên Firebase Storage
            // const filename = file.originalname.replace(/\.[^/.]+$/, "");
            // console.log(file.originalname);

            const parts = file.originalname.split('.');
            const extension = parts.pop();
            const newFileName = `${randomString()}.${extension}`;

            // console.log(newFileName);
            // continue;

            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/restaurant-ae24e.appspot.com/o/${newFileName}?alt=media`;
            imageUrls.push(imageUrl)

            const fileUpload = bucket.file(newFileName); // Lưu file với phần mở rộng là .png
            const fileStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            fileStream.on('error', (err) => {
                console.error(err);
                res.status(500).json({ error: 'Error uploading files' });
            });

            fileStream.on('finish', async () => {
                // Lưu đường dẫn vào MongoDB
                // const newImage = new Image({ imageUrl });
                // await newImage.save();

                // Thêm đường dẫn vào mảng imageUrls
                // imageUrls.push(imageUrl);
                if (imageUrls.length === req.files.length) {
                    // Trả về mảng các đường dẫn URL của các ảnh đã upload
                    res.json({ imageUrls });
                }
            });
            console.log(imageUrls);
            fileStream.end(file.buffer);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading files' });
    }
}


module.exports = { uploadFile, upload }

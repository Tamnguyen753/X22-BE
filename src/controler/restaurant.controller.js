const { isValidObjectId } = require("mongoose");
const { messages } = require("../constants/messages");
const { restaurantModel } = require("../models/restaurant.model");

const getRestaurants = async (req, res) => {
    let keyword = req.query.keyword?.trim();
    let page = Number(req.query?.page) ?? 1;
    let pageSize = Number(req.query?.pageSize) ?? 15;

    try {
        const queryBuilder = {
            $or: [
                { name: { $regex: new RegExp(keyword) } },
                { address: { $regex: new RegExp(keyword) } },
            ]
        };

        const restaurantCount = await restaurantModel.find(queryBuilder).count()

        const restaurants = await restaurantModel.find(
            queryBuilder,
            null,
            { limit: pageSize, skip: pageSize * (page - 1) }
        );

        return res.status(200).json({
            data: restaurants,
            page: page,
            pageSize: pageSize,
            total: restaurantCount
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: messages.serverError, success: false });
    }

}

const getRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        if (!isValidObjectId(restaurantId))
            return res.status(400).json({
                success: false,
                message: messages.invalidData
            });

        const restaurant = await restaurantModel.findById(restaurantId)

        if (!restaurant)
            return res.status(404).json({
                success: false,
                message: messages.restaurantNotFound
            });

        return res.status(201).send({
            message: messages.success,
            data: restaurant
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: messages.serverError
        })
    }
}

const createRestaurant = async (req, res) => {
    // const files = req.files;
    // if (!files) {
    //     return res.status(400).json({ success: false, message: "Chưa có ảnh nào được tải lên!" });
    // }

    // console.log(files);

    const { name, address, describe, image} = req.body;

    if (!name || !address || !describe || !image || image.length == 0) {
        return res.status(400).json({ success: false, message: "Bạn chưa điền đủ thông tin!" });
    }

    try {
        // const images = files.map(file =>`https://firebasestorage.googleapis.com/v0/b/restaurant-ae24e.appspot.com/o/${file}?alt=media`);
        // console.log(images);

        const newRestaurant = new restaurantModel({
            name,
            address,
            describe,
            image: image,
            rate: 0,
            createdAt: new Date(),
            viewCount: 0,
            rateCount: 0,
        });

        await newRestaurant.save();

        res.json({ success: true, message: "Tạo mới nhà hàng thành công!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
    }
};


const updateRestaurant = async (req, res) => {
    const { name, address, describe, image } = req.body;

    if (!name || !address || !describe || !image) {
        return res.status(404).json({ success: false, message: "Nhà hàng không tồn tại!" });
    }


    try {
        const existingRestaurant = await restaurantModel.findById({ _id: req.params.id });
        if (!existingRestaurant) {
            return res.status(404).json({ success: false, message: "Nhà hàng không tồn tại!" });
        }

        let updatedRestaurant = {
            name,
            address,
            describe,
            image
        }

        await restaurantModel.updateOne({ _id: req.params.id }, updatedRestaurant);

        res.json({ success: true, message: "Cập nhật thành công!", restaurant: updatedRestaurant });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
    }
};

// const DeleteRestaurant = async (req, res) => {
//     try {
//         const RestaurantDeleteCondition = { _id: req.params.id };

//         const deleteRestaurant = await restaurantModel.findOneAndDelete(RestaurantDeleteCondition);

//         if (!deleteRestaurant) {
//             return res.status(404).json({ success: false, message: "Nhà hàng không tồn tại!" });
//         }

//         res.json({ success: true, message: "Xoá thành công", restaurant: deleteRestaurant });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
//     }
// }

// const GetRestaurant = async (req, res, next) => {
//     try {
//         const restaurantId = req.params.id;
//         const restaurant = await restaurantModel.findOne({ _id: restaurantId });
//         if (!restaurant) {
//             return res.status(404).json({ success: false, message: "Nhà hàng không tồn tại!" });
//         }
//         res.json(restaurant);
//     } catch (err) {
//         next(err);
//     }
// };

module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
};

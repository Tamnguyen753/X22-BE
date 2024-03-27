require("dotenv").config();
const express = require('express');
const {StaffRoute} = require('./src/routes/staff');
const {RestaurantRoute} = require('./src/routes/Restaurant');
const {restaurantRoute} = require('./src/routes/restaurantAccount');
const cors = require("cors");
// const {connectDB} = require("./src/config/db");
const {connectDB} = require("./src/utils/db");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/staff", StaffRoute); //dk staff
app.use("/api/restaurants", restaurantRoute); //dk restaurant
app.use("/api/restaurants/info", RestaurantRoute); //CRUD restaurant

connectDB()
    .then((res) => {
        console.log(res);
        app.listen(3000, () => {
            console.log("server chạy thành công !!");
        });
    })
    .catch((err) => {
        console.log(err);
    })


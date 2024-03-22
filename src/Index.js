const express = require('express');
const { StaffRoute } = require('./routes/staff');
const { RestaurantRoute } = require('./routes/Restaurant');
const { restaurantRoute } = require('./routes/restaurantAccount');
const { connectDB } = require('./config/db');
const { authRouter } = require('./routes/authRoute');
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", authRouter)
app.use("/api/staff", StaffRoute); //dk staff
app.use("/api/restaurants", restaurantRoute); //dk restaurant
app.use("/api/restaurants/info", RestaurantRoute); //CRUD restaurant



app.get("/", (req, res) => {
    res.send({
        mesasag: 'Thành công !'
    })
})
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
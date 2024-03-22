const express = require('express');
const { StaffRoute } = require('./src/routes/staff');
const { RestaurantRoute } = require('./src/routes/Restaurant');
const { restaurantRoute } = require('./src/routes/restaurantAccount');
const { connectDB } = require('./src/config/db');
const { authRouter } = require('./src/routes/authRoute');
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
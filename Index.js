require('dotenv').config()
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/db");
const app = express();

const { authRoute } = require("./src/routes/auth.route");
const { restaurantRoute } = require("./src/routes/restaurant.route");
const { staffRoute } = require("./src/routes/staff.route");
const { menuRoute } = require('./src/routes/menu.route');
const { reservationRoute } = require('./src/routes/reservation.route');

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/restaurant", restaurantRoute); //CRUD restaurant
app.use("/api/menu", menuRoute);
app.use("/api/staff", staffRoute); //dk staff
app.use("/api/reservation", reservationRoute);

app.get("/", (req, res) => {
  res.send({
    mesasage: "Thành công !",
  });
});

connectDB()
  .then((res) => {
    console.log(res);
    app.listen(9000, () => {
      console.log("server chạy thành công!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

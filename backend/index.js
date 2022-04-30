require("dotenv").config();

var express = require("express");
var app = express();
app.use(express.json());

const cors = require("cors");
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

const apiRouter = require("./routes/routes");
const hotelRouter = require('./routes/hotel_routes');
const bookingsRouter = require('./routes/booking_routes');

app.use("/", apiRouter);
app.use("/hotels", hotelRouter);
app.use("/bookings", bookingsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

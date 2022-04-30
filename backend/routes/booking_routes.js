const express = require('express');
const router = express.Router();
const BookingService = require("./../services/booking_services");
const booking_service = new BookingService();

router.get("/hotels/:hotelId", async(request, response) => {
    const { params } = request;
    const { hotelId } = params;
    try {
        const { status, ...data } = await booking_service.getHotelBookings(hotelId);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`BookingRoutes::GET /bookings/hotels/${hotelId}:: Internal server error \n ${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

router.get("/users/:userId", async(request, response) => {
    const { params } = request;
    const { userId } = params;
    try {
        const { status, ...data } = await booking_service.getUserBookings(userId);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`BookingRoutes::GET /bookings/users/${userId}:: Internal server error \n ${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

module.exports = router;
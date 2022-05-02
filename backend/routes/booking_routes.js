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

router.post("/bookings/hotels/:hotel_id/rooms/:room_id", async(request, response) => {
    const { headers, params, body } = request;
    const { userId } = headers;
    const { hotel_id, room_id } = params;
    try {
        const { status, ...data } = await booking_service.bookRoomForUser(userId, room_id, hotel_id, body);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`BookingRoutes::POST /bookings/hotels/${hotel_id}/rooms/${room_id}:: Internal server error \n ${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

router.put("/bookings/:booking_id", async(request, response) => {
    const { headers, params, body } = request;
    const { userId } = headers;
    const { booking_id } = params;
    try {
        const { status, ...data } = await booking_service.updateBooking(userId, booking_id, body);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`BookingRoutes::PUT /bookings/${booking_id}:: Internal server error \n ${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

router.delete("/bookings/:booking_id", async(request, response) => {
    const { headers, params, body } = request;
    const { userId } = headers;
    const { booking_id } = params;
    try {
        const { status, ...data } = await booking_service.cancelBooking(userId, booking_id);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`BookingRoutes::DELETE /bookings/${booking_id}:: Internal server error \n ${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const HotelService = require("./../services/hotel_service");
const RoomService = require("./../services/room_service");
const hotel_service = new HotelService();
const room_service = new RoomService();

// Get ONE room of ONE hotel
router.get("/:hotel_id/rooms/:room_id", async(request, response) => {
    const { params } = request;
    const { hotel_id, room_id } = params;
    try {
        const { status, ...data } = await room_service.getRoomsByID(hotel_id, room_id);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`HotelRoutes::GET /hotels/${hotel_id}/rooms/${room_id}:: Internal server error \n ${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

router.put("/:hotelId/rooms/:roomId", async(request, response) => {
    const { params, body } = request;
    const { hotelId, roomId } = params;
    try {
        const { status, ...data } = await room_service.update(hotelId, roomId, body);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`HotelRoutes::PUT /hotels/${hotelId}/rooms/${roomId}:: Internal server error \n${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
})

// Get MANY rooms of ONE hotel
router.get("/:hotel_id/rooms", async(request, response) => {
    const { params } = request;
    const { hotel_id } = params;
    try {
        const { status, ...data } = await room_service.getRooms(hotel_id);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`HotelRoutes::GET /hotels/${hotel_id}/rooms:: Internal server error \n${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

router.post("/:hotel_id/rooms", async(request, response) => {
    const { params, body } = request;
    const { hotel_id } = params;
    try {
        const { status, ...data } = await room_service.createRoom(hotel_id, body);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`HotelRoutes::POST /hotels/${hotel_id}/rooms:: Internal server error \n${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

// Get ONE hotel
router.get("/:id", async (request, response) => {
    try {
        const { params } = request;
        const { id } = params;

        const { status, ...data } = await hotel_service.getHotelsByID(id);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`HotelRoutes::GET /hotels/${id}:: Internal server error \n ${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

// Set ONE hotel
router.put("/:id", async (request, response) => {
    try {
        const { params, body } = request;
        const { id } = params;

        const { status, ...data } = await hotel_service.updateHotelById(id, body);
        return response.status(status).send({...data});
    } catch(err) {
        console.error("HotelRoutes::GET /hotels/:: Internal server error \n", err);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
})

// Get MANY hotels
router.get("/", async (request, response) => {
    try {
        const { status, ...data } = await hotel_service.getHotels();
        return response.status(status).send({...data});
    } catch(err) {
        console.error("HotelRoutes::GET /hotels/:: Internal server error \n", err);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});


module.exports = router;
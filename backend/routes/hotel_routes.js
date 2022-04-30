const express = require('express');
const router = express.Router();
const HotelService = require("./../services/hotel_service");
const hotel_service = new HotelService();

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
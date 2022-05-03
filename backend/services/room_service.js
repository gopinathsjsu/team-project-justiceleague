const model = require('./../models/roomsModel');
const { HTTP_500, HTTP_RES } = require('./../Utilities/http_utils');
class RoomService {
    async getRooms(hotelId) {
        try {
            const rooms = await model.getRoomsByHotelID(hotelId);
            return {
                status: 200,
                data: rooms,
                msg: `Fetched rooms`
            };
        } catch(err) {
            console.error(`RoomService::getRooms/${hotelId}::Uncaught exception\n, ${err}`);
            return HTTP_500();
        };
    };

    async getRoomsByID(hotelId, roomId) {
        try {
            const rooms = await model.getRoomsByRoomID(hotelId, roomId);
            return {
                status: 200,
                data: rooms,
                msg: `Fetched rooms`
            };
        } catch(err) {
            console.error(`RoomService::getRooms/${hotelId}::Uncaught exception\n, ${err}`);
            return HTTP_500();
        };
    };

    async createRoom(hotel_id, newRoomObj) {
        const {
            name, basePrice, roomType, minGuests, weekEndSurge, festivalSurge 
        } = newRoomObj;

        if (!name || !basePrice || !(roomType in model.ROOM_ACCOMODATION) ) {
            return HTTP_RES(400, "Bad Request: Missing room information");
        };

        const newRoomObject = {
            id: new Date().getTime() % 100000,
            hotel_id,
            name,
            base_price: basePrice,
            room_type: roomType,
            min_guests: minGuests || model.ROOM_ACCOMODATION[roomType],
            week_end_surge: weekEndSurge || 0,
            festival_surge: festivalSurge || 0
        };

        const newRoom = await model.create(
            model.createRoomFactory(newRoomObject)
        );

        return HTTP_RES(200, "Success", newRoom);
    };

    async update(hotelId, roomId, updateObj) {
        // @TODO: Authorization
        const rooms = await model.getRoomsByRoomID(hotelId, roomId);
        if (!(Array.isArray(rooms) && rooms.length > 0)) 
            return HTTP_RES(404, "No room found");

        const { name, basePrice, minGuests, weekEndSurge, festivalSurge } = updateObj;
        const [ room ] = rooms;

        if (room.hotel_id != hotelId) {
            return HTTP_RES(403, "Forbidden");
        };

        await model.updateByID(
            roomId,
            model.updateRequestactory(
                name || room.name,
                basePrice || room.base_price,
                minGuests || room.min_guests,
                weekEndSurge || room.week_end_surge,
                festivalSurge || room.festival_surge
            )
        )

        const updated = await model.getRoomsByRoomID(hotelId, roomId);
        return HTTP_RES(200, "Success", updated);
    };
};

module.exports = RoomService;
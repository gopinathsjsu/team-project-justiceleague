const model = require('./../models/roomsModel');
const { HTTP_500 } = require('./../Utilities/http_utils');
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
};

module.exports = RoomService;
const model = require('./../models/hotelModel');
const { HTTP_500 } = require('./../Utilities/http_utils');

class HotelService {
    /**
     * @description GET /hotels
     * consumed by both users and hotels
     */
    async getHotels() {
        try {
            const hotels = await model.getHotels();
            return {
                status: 200,
                data: hotels,
                msg: "Fetched hotels"
            }
        } catch(err) {
            console.error("HotelService::getHotels::Uncaught exception\n", err);
            return HTTP_500();
        };
    };

    /**
     * @description GET /hotels
     * consumed by both users and hotels
     * @todo In case of hotels requiring more information,
     * use the cookies to identify owner of hotel and provide more information
     * ONLY issue is the response may differ for customer and hotel
     */
    async getHotelsByID(hotel_id) {
        try {
            const hotels = await model.getHotelsByID(hotel_id);
            return {
                status: 200,
                data: hotels,
                msg: `Fetched hotel`
            }
        } catch(err) {
            console.error(`HotelService::getHotelsByID/${hotel_id}::Uncaught exception\n, ${err}`);
            return HTTP_500();
        };
    };
};

module.exports = HotelService;
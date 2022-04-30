const model = require('./../models/bookingsModel');
const { HTTP_500 } = require('./../Utilities/http_utils');

class BookingService {
    /**
     * @description GET /hotels
     * consumed by both users and hotels
     */

    constructor() {
        this.FETCHED_BOOKINGS =  "Fetched Bookings";
    };

    async getHotelBookings(hotelId) {
        try {
            const bookings = await model.getHotelBookings(hotelId);
            return {
                status: 200,
                data: bookings,
                msg: this.FETCHED_BOOKINGS
            }
        } catch(err) {
            console.error("BookingService::getHotelBookings::Uncaught exception\n", err);
            return HTTP_500();
        };
    };

    async getUserBookings(userId) {
        try  {
            const bookings = await model.getUserBookings(userId);
            return {
                status: 200,
                data: bookings,
                msg: this.FETCHED_BOOKINGS
            }
        } catch(err) {
            console.error("BookingService::getUserBookings::Uncaught exception\n", err);
            return HTTP_500();
        };
    };
};

module.exports = BookingService;
const model = require('./../models/bookingsModel');
const roomModel = require("./../models/roomsModel");
const PricingService = require('./pricing_service');
const { HTTP_404, HTTP_500, HTTP_RES } = require('./../Utilities/http_utils');

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

    /**
     * @todo Continue to keep an eye on this API
     * This API is very important over the entire application.
     * It is critical, detailed, and effects many moving componenets.
     * Must ensure care for the dev of this API
     * 
     * @param {*} userId 
     * @param {*} roomId 
     * @param {*} bookingInfo 
     * @param {*} hotelId 
     * @returns 200 A successful booking 
     */
    async bookRoomForUser(userId, roomId, hotelId, bookingInfo) {
        try {
            // TODO: Validate booking information
            const {
                start,
                end,
                total_guests,
                ammenities
            } = bookingInfo;

            // Assert room can be booked
            const existingBooking = await model.getBookingsByDates(start, end, roomId)
            if (existingBooking) {
                return HTTP_RES(400, "Room Booking Exists");
            };
            
            // (a) Validate room exists (b) and is not booked
            const roomObject = await roomModel.getRoomsByRoomID(hotelId, roomId);
            if (!roomObject) return HTTP_404("No such room");

            const { min_guests, guest_fee, weekend_surge, festival_surge } = roomObject;
            
            // Calculate price for the room
            const finalPrice = PricingService.calculateRoomPrice(
                PricingService.guest_charge({ total_guests, min_guests, guest_fee}),
                PricingService.surge_charge({ start, end, weekend_surge, festival_surge}),
                PricingService.customer_rewards()
            );

            const newBooking = await model.create({
                roomId,
                userId,
                ammenities,
                price: finalPrice,
            });

            return HTTP_RES(200, "Success", newBooking);

        } catch(e) {
            console.error("BookingService::bookRoomForUser::Uncaught exception\n", e);
            return HTTP_500();
        }
    };

    async updateBooking(userId, bookingId, request) {
        try {
            let booking = await model.getByID(userId, bookingId);
            if (!booking) return HTTP_404("No such booking");

            // Assert room can be booked
            const { start, end } = request;
            const existingBooking = await model.getBookingsByDates(start, end, roomId)

            if (existingBooking) {
                return HTTP_RES(400, "Room Booking Exists");
            };
            
            booking = { ...booking, ...request };
            const updated = await model.update();
            return HTTP_RES(200, "Success", updated);

        } catch(err) {
            console.error("BookingService::updateBooking::Uncaught exception\n", err);
            return HTTP_500();
        }
    };

    async cancelBooking(userId, bookingId) {
        try {
            let booking = await model.getByID(userId, bookingId);
            if (!booking) return HTTP_404("No such booking");

            // booking["status"] = False
            const updated = await model.update();
            return HTTP_RES(200, "Success", updated);
        } catch(err) {
            console.error("BookingService::cancelBooking::Uncaught exception\n", err);
            return HTTP_500();
        }
    };
};

module.exports = BookingService;
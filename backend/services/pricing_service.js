const model = require('./../models/bookingsModel');
const { HTTP_500 } = require('./../Utilities/http_utils');

/**
 * ROOM
 * min_guests
 * weekend_surge
 * festival_surge
 */


class PricingService {
    static guest_charge(guestInfo) {
        const { 
            total_guests,
            min_guests,
            guest_fee
        } = guestInfo;

        return Math.min(
            0, 
            (total_guests - min_guests) * guest_fee
        );
    };

    static weekend_surge(date, surge) {
        const nd = new Date(date);
        if (nd.getDay() === 0 ||  nd.getDay() === 6) {
            return surge;
        };
        return 0;
    };

    static festival_surge(date, surge) {
        const FESTIVALS = {
            "12/31": 1,
            "1/17": 1,
            "2/21": 1,
            "5/30": 1,
            "6/20": 1,
            "7/4": 1,
            "9/5": 1,
            "10/10": 1,
            "11/11": 1,
            "11/24": 1,
            "12/26": 1,
        };

        const nd = new Date(date);
        const festival = `${nd.getMonth()/nd.getDate()}`;

        if (festival in FESTIVALS) return surge;
        return 0;
    };

    static surge_charge(surgeInfo) {
        const {
            start,
            end,
            weekend_surge,
            festival_surge
        } = surgeInfo;

        let charge = 0;
        
        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            charge += Math.max(
                this.weekend_surge(date, weekend_surge),
                this.festival_surge(date, festival_surge)
            )
        };

        return charge; 
    };

    static customer_rewards() {
        return 0;
    };

    static calculateRoomPrice(base_price, pricingDetails) {
        const {
            guest_charge, 
            surge_charge, 
            customer_rewards
        } = pricingDetails;

        return (
            base_price + 
            guest_charge + 
            surge_charge - 
            customer_rewards
        );
    };
};

module.exports = PricingService;
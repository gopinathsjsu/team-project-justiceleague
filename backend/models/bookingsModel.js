const db = require("../dbConnection");
const DB_TABLE_BOOKINGS = process.env.DB_TABLE_BOOKINGS || 'bookings';
const model = {};

const getBookingsQuery = ((ownerId, table) => {
	return `
		SELECT *
		FROM ${table}
		WHERE owner_id = ${ownerId}
		`
	;
});

model.getHotelBookings = (hotelId, table = DB_TABLE_BOOKINGS) => {
	return new Promise((resolve, reject) => {
		db.query(
			getBookingsQuery(hotelId, table), 
			(err, results) => {
				if (err) return reject(err);
				return resolve(results);
			}
		);
	});
};

model.getUserBookings = (userId, table = DB_TABLE_BOOKINGS) => {
	return new Promise((resolve, reject) => {
		db.query(
			getBookingsQuery(userId, table), 
			(err, hotel) => {
				if (err) return reject(err);
				return resolve(hotel);
			}
		);
	})
};

module.exports = model;

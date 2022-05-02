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

model.create = (newBooking) => {
	return new Promise((resolve, reject) => {
		const query = "";
		db.query(
			query,
			(err, booking) => {
				if (err) return reject(err);
				resolve(booking);
			}
		)
	});
};

model.getByID = (bookingID, userId = undefined) => {
	return new Promise((resolve, reject) => {
		// if userId {};
		const query = "";
		db.query(query, (err, booking) => {
			if (err) return reject(err);
			resolve(booking);
		})
	});
}

model.getBookingsByDates = (from, end, roomId) => {
	return new Promise((resolve, reject) => {
		const query = "";
		db.query(
			query,
			(err, booking) => {
				if (err) return reject(err);
				resolve(booking);
			}
		)
	});
};

model.update = () => {
	return new Promise((resolve, reject) => {
		const query = "";
		db.query(
			query,
			(err, booking) => {
				if (err) return reject(err);
				resolve(booking);
			}
		)
	});
};

module.exports = model;

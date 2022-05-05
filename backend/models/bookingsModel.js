const db = require("../dbConnection");
const DB_TABLE_BOOKINGS = process.env.DB_TABLE_BOOKINGS || 'bookings';
const model = {};

model.getHotelBookings = (table = DB_TABLE_BOOKINGS) => {
	return new Promise((resolve, reject) => {
		const query = `
			SELECT *
			FROM ${table}
		`;
		db.query(
			query, 
			(err, results) => {
				if (err) return reject(err);
				return resolve(results);
			}
		);
	});
};

model.getUserBookings = (userId, table = DB_TABLE_BOOKINGS) => {
	return new Promise((resolve, reject) => {
		const query = `
			SELECT *
			FROM ${table}
			WHERE user_id = '${userId}'
		`
		;
		db.query(
			query,
			(err, hotel) => {
				if (err) return reject(err);
				return resolve(hotel);
			}
		);
	})
};

model.create = (
	user_id,
	room_id,
	price,
	from_date,
	to_date,
	guest_count,
	status, 
	table = DB_TABLE_BOOKINGS
	) => {
	return new Promise((resolve, reject) => {
		const query = `
			INSERT
			INTO ${table} 
			(room_id, user_id, price, from_date, to_date, guest_count, status)
			VALUES 
			('${room_id}', '${user_id}', '${price}', '${from_date}', '${to_date}', '${guest_count}', '${status}');
		`;

		console.info("QQ", query);

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

// Referred to 
// https://stackoverflow.com/questions/19743829/mysql-check-if-two-date-range-overlap-with-input
// For checking overlap of two date pairs
model.getBookingsByDates = (bookingStart, bookingEnd, roomId, table = DB_TABLE_BOOKINGS) => {
	return new Promise((resolve, reject) => {
		const query = `
		SELECT *
		FROM ${table}
		WHERE (to_date > '${new Date(bookingStart).toISOString()}' AND from_date < '${new Date(bookingEnd).toISOString()}' AND room_id = '${roomId}')
		`;
		db.query(
			query,
			(err, booking) => {
				if (err) return reject(err);
				resolve(booking);
			}
		)
	});
};

model.updateByID = (booking_id, spaceSeperatedUpdateQueryString, table = DB_TABLE_BOOKINGS) => {
	return new Promise((resolve, reject) => {
		const query = `
			UPDATE ${table}
			SET ${spaceSeperatedUpdateQueryString}
			WHERE id = '${booking_id}'
		`;
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

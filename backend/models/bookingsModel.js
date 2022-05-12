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
			AND
			status IN ('confirmed', 'created')
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

		db.query(
			query,
			(err, booking) => {
				if (err) return reject(err);
				resolve(booking);
			}
		)
	});
};

model.getByID = (bookingID, userId, table = DB_TABLE_BOOKINGS) => {
	return new Promise((resolve, reject) => {
		// if userId {};

		const query = `
			SELECT *
			FROM ${table}
			WHERE id = '${bookingID}'
		`;
		db.query(query, (err, booking) => {
			if (err) return reject(err);
			resolve(booking);
		})
	});
}

// Referred to 
// https://stackoverflow.com/questions/19743829/mysql-check-if-two-date-range-overlap-with-input
// For checking overlap of two date pairs
// // WHERE (to_date > '${new Date(bookingStart).toISOString()}' AND from_date < '${new Date(bookingEnd).toISOString()}' AND room_id = '${roomId}')
model.getBookingsByDates = (startDate, endDate, roomId, table = DB_TABLE_BOOKINGS) => {
	return new Promise((resolve, reject) => {
		const bookingStart = startDate.toISOString().replace("Z", "");
		const bookingEnd = endDate.toISOString().replace("Z", "");

		const query = `
		SELECT *
		FROM ${table}
		WHERE (to_date > '${bookingStart}' AND from_date < '${bookingEnd}' AND room_id = '${roomId}')
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
			WHERE id = '${booking_id}'`;
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

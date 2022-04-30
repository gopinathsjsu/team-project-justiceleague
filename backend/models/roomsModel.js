const db = require("../dbConnection");
const DB_TABLE_ROOMS = process.env.DB_TABLE_ROOMS || 'rooms';
const model = {};

model.getRoomsByRoomID = (hotelId, roomId, table = DB_TABLE_ROOMS) => {
	return new Promise((resolve, reject) => {
		const query = `
			SELECT *
			FROM ${table}
			WHERE hotel_id = '${hotelId}' AND room_id = '${roomId}'
			`
		;
		db.query(query, (err, results) => {
			if (err) return reject(err);
			return resolve(results);
		});
	});
};

model.getRoomsByHotelID = (hotelId, table = DB_TABLE_ROOMS) => {
	return new Promise((resolve, reject) => {
		const query = `
			SELECT * 
			FROM ${table}
			WHERE hotel_id = '${hotelId}'
		`
		;

		db.query(query, (err, hotel) => {
			if (err) return reject(err);
			return resolve(hotel);
		})
	})
};

module.exports = model;

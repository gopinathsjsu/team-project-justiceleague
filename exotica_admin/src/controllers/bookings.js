import axios from "axios";

// STUB for controllers
export function fetch_bookings() {
	return new Promise((resolve, reject) => {
		const host_name = process.env.HOST_NAME || "http://localhost:5000";
		const end_point = "/bookings/admin";
		const URL = `${host_name}${end_point}`

		const network_call = axios.get(URL, {
			headers: {
				"name": process.env.USER_NAME || "root",
				"pwd": process.env.USER_PWD || "grantAllPermissions"
			}
		});

		network_call.then((response) => {
			// console.info("BookingsController::fetch_bookings::Response = ", response);
			resolve(response);
		}).catch((err) => {
			console.error("BookingsController::fetch_bookings::Error response = ", err);
			reject(err);
		});
	})
};
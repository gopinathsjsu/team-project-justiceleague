import axios from "axios";

export async function fetch_rooms() {
	return new Promise((resolve, reject) => {
		const host_name = process.env.HOST_NAME || "http://localhost:5000";
		const end_point = "/rooms";
		const URL = `${host_name}${end_point}`

		const network_call = axios.get(URL);

		network_call.then((response) => {
			resolve(response);
		}).catch((err) => {
			console.error("RoomsController::fetch_rooms::Error response = ", err);
			reject(err);
		});
	})
};

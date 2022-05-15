import { semiEndpoint } from "../Utils/ApiEndpoint";
import axios from "axios";

// STUB for controllers
export function getAllRooms() {
  return axios.get(semiEndpoint + "/rooms");
}

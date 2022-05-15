import { semiEndpoint } from "../utils/ApiEndpoint";
import axios from "axios";

// STUB for controllers
export function testAPI(userId, dataJson) {
  return axios.get(semiEndpoint + "/testendpoint" + userId, dataJson);
}

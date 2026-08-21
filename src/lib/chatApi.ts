import axios from "axios";
import { API_BASE_URL } from "./constants";

const chatApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export default chatApi;

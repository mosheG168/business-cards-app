import axios from "axios";
import { getToken } from "./tokenService";

const api = axios.create({
  baseURL: "https://bcard-ojqa.onrender.com/",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export default api;

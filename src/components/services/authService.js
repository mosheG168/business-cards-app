import api from "./apiService";
import { saveToken } from "./tokenService";

export const registerUser = async (userData) => {
  const { data } = await api.post("/users", userData);
  return data;
};

export const loginUser = async (credentials, remember = false) => {
  const { data: token } = await api.post("/users/login", credentials);
  saveToken(token, remember); // Save token immediately
  return token;
};

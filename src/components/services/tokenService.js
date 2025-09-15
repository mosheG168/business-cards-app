import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export const saveToken = (token, remember = false) => {
  if(remember)
  {
    localStorage.setItem(TOKEN_KEY, token);
  }
  else
  {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
 
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = () => {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
};

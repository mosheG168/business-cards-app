import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCurrentUser, removeToken } from "../services/tokenService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
    setReady(true);
  }, []);

  const login = useCallback(() => {
    setUser(getCurrentUser()); 
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

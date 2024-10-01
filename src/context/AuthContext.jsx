/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../config/constants";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useTokenRefresh(isAuthenticated, setIsAuthenticated);
  useEffect(() => {
    
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  const logout = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

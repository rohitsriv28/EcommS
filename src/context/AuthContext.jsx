import { createContext, useState, useEffect } from "react";
import { setupInterceptors, updateToken } from "../config/Axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [apiToken, setApiToken] = useState(null);
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  const updatedUser = (newUser) => setUser(newUser);

  const setApiTokenAndUpdateAxios = (newToken) => {
    setApiToken(newToken);
    updateToken(newToken);
  };

  useEffect(() => {
    setupInterceptors(() => apiToken, setApiTokenAndUpdateAxios, updatedUser);
  }, []);

  const contextValue = {
    apiToken,
    setApiToken: setApiTokenAndUpdateAxios,
    user,
    setUser,
    updatedUser,
    company,
    setCompany,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

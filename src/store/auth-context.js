import React, { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getMe } from "../lib/api";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  userProfile: null,
  login: (token) => {},
  logout: () => {},
});

function getStoredToken() {
  return localStorage.getItem("token");
}

function setStoredToken(token) {
  if (token != null) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());
  const { sendRequest, data: userProfile } = useHttp(getMe);
  useEffect(() => {
    if (token) {
      // load userProfile
      sendRequest({ token });
    }
  }, [token, sendRequest]);
  const contextValue = {
    token,
    isLoggedIn: !!token,
    userProfile,
    login: (token) => {
      setToken(token);
      setStoredToken(token);
    },
    logout: () => {
      setToken(null);
      setStoredToken(null);
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

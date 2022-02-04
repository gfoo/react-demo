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
  let initialToken = getStoredToken();
  const [token, setToken] = useState(initialToken);
  const { sendRequest, data: userProfile } = useHttp(getMe);
  useEffect(() => {
    if (token) {
      sendRequest({ token });
    }
  }, [token, sendRequest]);

  const logoutHandler = () => {
    setToken(null);
    setStoredToken(null);
  };
  const loginHandler = (token, user_id, user_email) => {
    setToken(token);
    setStoredToken(token);
  };

  const contextValue = {
    token,
    isLoggedIn: !!token,
    userProfile,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

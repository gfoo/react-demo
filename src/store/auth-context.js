import React, { useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  login: (token, user_id, user_email) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  let initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
  };
  const loginHandler = (token, user_id, user_email) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("user_email", user_email);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

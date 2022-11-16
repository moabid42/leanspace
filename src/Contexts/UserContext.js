import React from "react";

export const UserContext = React.createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
});

export default UserContext;

import React from "react";

const UserContext = React.createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
});

export default UserContext;

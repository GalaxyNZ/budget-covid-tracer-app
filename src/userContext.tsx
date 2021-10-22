import React from "react";

const userInfo = {
  id: "",
  email: "",
  name: ""
};

const UserContext = React.createContext(userInfo);

export default UserContext;

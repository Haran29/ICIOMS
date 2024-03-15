// userContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/profile").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

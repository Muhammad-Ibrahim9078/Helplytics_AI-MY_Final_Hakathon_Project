import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    
    setIsAuthChecked(true);
  }, []);

  // Sync user state with localStorage
  const updateUser = (userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, isAuthChecked }}>
      {children}
    </UserContext.Provider>
  );
};

export const getData = () => useContext(UserContext);
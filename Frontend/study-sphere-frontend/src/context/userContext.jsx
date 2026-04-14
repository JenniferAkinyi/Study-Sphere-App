import { createContext, useContext, useState, useEffect } from "react";
import { logStudyMinutes } from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const addStudyMinutes = async (minutes) => {
    if (!user) return;
    try {
      const res = await logStudyMinutes(user.id, minutes);
      const updatedUser = res.user;
      updateUser(updatedUser);
    } catch (error) {
      console.error("Error logging study minutes:", error);
    }
  };
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, updateUser, clearUser, addStudyMinutes }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

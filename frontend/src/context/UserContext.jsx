import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to fetch the current user
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/current-user`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("Fetched user:", data); // ✅ Debugging output
      setUser(data.user || null);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  // Fetch user on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

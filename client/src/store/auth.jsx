/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  }

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("https://disease-predictor-1-a2y1.onrender.com", {
        method: "GET",
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.log("Failed to fetch user:", response.status);
      }
      
    } catch (error) {
      console.error("Error fetching user data",error);
    }
  }

  useEffect(() => {
    if (token) {
      userAuthentication();
    }  
  }, [token]);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser,user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
}


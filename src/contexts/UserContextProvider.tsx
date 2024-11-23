/** @format */

import React, { ReactNode, useEffect } from "react";
import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  ava: string;
}

export interface StateContextType {
  user: User | null;
  token: string | null;
  setUserWithStorage: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const StateContext = createContext<StateContextType>({
  user: null,
  token: null,
  setUserWithStorage: () => {},
  setToken: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem("USER_DATA");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("TOKEN")
  );

  // useEffect(() => {
  //   const validate = async () => {
  //     if (token) {
  //       try {
  //         const response = await fetch(
  //           `${import.meta.env.VITE_API_URL_SERVER}/api/user`,
  //           {
  //             method: "POST",
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //             credentials: "include",
  //           }
  //         );

  //         if (!response.ok) {
  //           setUser(null);
  //           setToken(null);
  //           localStorage.removeItem("TOKEN");
  //           localStorage.removeItem("USER_DATA");
  //         } else {
  //           const data = await response.json();
  //           setUser(data);
  //         }
  //       } catch (error) {
  //         console.error("Token validation error", error);
  //         setUser(null);
  //         setToken(null);
  //         localStorage.removeItem("TOKEN");
  //         localStorage.removeItem("USER_DATA");
  //       }
  //     }
  //   };

  //   validate();
  // }, []);

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("TOKEN", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("TOKEN");
      setToken(null);
    }
  };

  const setUserWithStorage = (userData: User | null) => {
    if (userData) {
      const safeUserData = {
        name: userData.name,
        email: userData.email,
        ava: userData.ava,
      };
      localStorage.setItem("USER_DATA", JSON.stringify(safeUserData));
      setUser(userData);
    } else {
      localStorage.removeItem("USER_DATA");
      setUser(null);
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUserWithStorage,
        setToken: handleSetToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateUserContext = () => {
  return useContext(StateContext);
};

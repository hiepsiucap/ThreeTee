/** @format */

import React, { ReactNode, useEffect } from "react";
import { createContext, useContext, useState } from "react";

export interface StateContextType {
  loading: boolean;
  changeLoading: (ld: boolean) => void;
}

export const StateContext = createContext<StateContextType>({
  loading: false,
  changeLoading: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export const LoadingContextProvider = ({
  children,
}: UserContextProviderProps) => {
  const [loading, changeIsLoading] = useState<boolean>(true);
  const changeLoading = (ld: boolean) => {
    changeIsLoading(ld);
  };
  return (
    <StateContext.Provider
      value={{
        loading,
        changeLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateLoadContext = () => {
  return useContext(StateContext);
};

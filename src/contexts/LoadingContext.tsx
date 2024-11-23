/** @format */

import { createContext, useContext, useState, ReactNode } from "react";

export interface StateContextType {
  loading: boolean;
  changeLoading: (ld: boolean) => void;
}

export const StateContext = createContext<StateContextType>({
  loading: false,
  changeLoading: () => {
    console.warn("changeLoading called outside of Provider");
  },
});

interface LoadingContextProviderProps {
  children: ReactNode;
}

export const LoadingContextProvider = ({
  children,
}: LoadingContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const changeLoading = (ld: boolean) => {
    setLoading(ld);
  };

  return (
    <StateContext.Provider value={{ loading, changeLoading }}>
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateLoadContext = () => {
  return useContext(StateContext);
};

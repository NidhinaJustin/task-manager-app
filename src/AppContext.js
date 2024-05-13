import React, { createContext, useContext } from "react";
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  

  return (
    <AppContext.Provider
      value={{

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

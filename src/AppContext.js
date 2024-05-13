import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const [loading, setLoading] = useState(false);
  
  const updateSideBarNav = (item) => {
    setSelectedOption(item);
    setLoading(true);
    setTimeout(() => {
      // After saving is complete, set loading state to false
      setLoading(false);
    }, 2000); // Simulating 2 seconds delay
  };
  return (
    <AppContext.Provider
      value={{
        selectedOption,
        loading,
        updateSideBarNav,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

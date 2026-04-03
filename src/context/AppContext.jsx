import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [district, setDistrict] = useState('Indore');
  // other global states like theme could go here

  return (
    <AppContext.Provider value={{ language, setLanguage, district, setDistrict }}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => useContext(AppContext);

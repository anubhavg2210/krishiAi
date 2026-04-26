import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [district, setDistrict] = useState('Indore');

  // Live weather data fetched from OpenWeatherMap
  // null = not yet loaded, object = loaded, 'error' = failed
  const [weatherData, setWeatherData] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'no_key'

  // Soil data from CropSuggestForm
  const [soilData, setSoilData] = useState(null);

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      district, setDistrict,
      weatherData, setWeatherData,
      weatherStatus, setWeatherStatus,
      soilData, setSoilData,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

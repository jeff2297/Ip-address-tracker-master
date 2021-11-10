import React, { useState, useContext, useEffect, useCallback } from "react";
const AppContext = React.createContext();
const API_ENDPOINT = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`;

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("&ipAddress=8.8.8.8");
  const [addressData, setAddressData] = useState(null);

  const fetchData = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINT}${query}`);
      const data = await response.json();
      if (!data.ip) {
        setError({ show: true, msg: data.messages });
      } else {
        const newData = {
          ip: data.ip,
          location: `${data.location.city}, ${data.location.country} ${data.location.postalCode}`,
          timezone: data.location.timezone,
          isp: data.isp,
          lat: data.location.lat,
          lng: data.location.lng,
        };
        setAddressData(newData);
        setError({ show: false, msg: "" });
      }
      setIsLoading(false);
    } catch (error) {
      setError({
        show: true,
        msg: "Something went wrong. Please try again later.",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <AppContext.Provider value={{ addressData, isLoading, error, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
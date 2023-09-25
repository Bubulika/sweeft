import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [countryList, setCountryList] = useState([]);
  const [activeCountry, setActiveCountry] = useState([]);
  const [currExchangeCountry, setCurrExchangeCountry] = useState(null);
  const getCountryList = async () => {
    const res = await axios.get("https://restcountries.com/v3.1/all");
    setCountryList(res.data);
  };

  useEffect(() => {
    getCountryList();
  }, []);

  return (
    <DataContext.Provider
      value={{
        countryList,
        setActiveCountry,
        activeCountry,
        currExchangeCountry,
        setCurrExchangeCountry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

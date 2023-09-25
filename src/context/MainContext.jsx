import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [allCountries, setAllCountries] = useState([]);
  const [chosenCountry, setChosenCountry] = useState({});
  console.log(chosenCountry);
  const fetchLocation = useCallback(
    async (lat, lng) => {
      const KEY = "AIzaSyCAoye4NPtFgp6CGswX430ahWNIW86sWuQ";
      if (lat && lng) {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${KEY}`
        );
        const data = response.data;
        const currentLocationName =
          data.results[data.results.length - 1].formatted_address;

        setChosenCountry(
          allCountries.find((el) => el.name.common === currentLocationName)
        );
      }
    },
    [allCountries, setChosenCountry]
  );
  useEffect(() => {
    const askForPermission = async () => {
      const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      };
      if ("geolocation" in navigator) {
        if (window.confirm("Allow this app to access your location?")) {
          try {
            const position = await getCurrentLocation();
            const { latitude, longitude } = position.coords;
            fetchLocation(latitude, longitude);
          } catch (err) {
            console.log("Error getting location");
          }
        }
      }
    };

    askForPermission();
  }, [fetchLocation]);

  const getAllCountries = useCallback(async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    setAllCountries(response.data);
  }, []);

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  return (
    <MainContext.Provider
      value={{ allCountries, chosenCountry, setChosenCountry }}
    >
      {children}
    </MainContext.Provider>
  );
}

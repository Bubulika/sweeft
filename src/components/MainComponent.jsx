import React from "react";
import { useCallback, useContext, useEffect } from "react";
import GlobalStyles from "../GlobalStyles";
import InputComponent from "../components/InputComponent";
import CountryDetails from "../components/CountryDetails";
import AirportsComponent from "../components/AirportsComponent";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";
import { Route, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CurrencyExchange from "./CurrencyExchange";
import {
  StyledNavLink,
  StyledNavigationHeader,
  WholeWrapper,
} from "./components";

const MainComponent = () => {
  const { countryId } = useParams();
  const location = useLocation();
  const {
    countryList,
    setActiveCountry,
    currExchangeCountry,
    setCurrExchangeCountry,
  } = useContext(DataContext);
  const fetchLocation = useCallback(
    async (lat, lng) => {
      const KEY = "AIzaSyD-kFvttoGj-uZQhXmoKQGfulB15H3nEHg";
      if (lat && lng) {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${KEY}`
        );
        const data = response.data;
        const countryName =
          data.results[data.results.length - 1].formatted_address;
        const found = countryList.find(
          (item) => item.name.common === countryName
        );

        setActiveCountry(found);
        !currExchangeCountry && setCurrExchangeCountry(found);
      }
    },
    [countryList, setActiveCountry, currExchangeCountry, setCurrExchangeCountry]
  );

  const success = useCallback(
    (pos) => {
      const crd = pos.coords;
      fetchLocation(crd.latitude, crd.longitude);
    },
    [fetchLocation]
  );
  const error = useCallback((err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }, []);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            navigator.geolocation.getCurrentPosition(success, error);
          });
      } else {
        alert("Geolocation is not supported in your browser.");
      }
    }
    if (countryId) {
      const found = countryList.find(
        (el) => el.cca3 === countryId.toUpperCase()
      );

      setActiveCountry(found);
      !currExchangeCountry && setCurrExchangeCountry(found);
    } else getLocation();
  }, [
    success,
    error,
    countryId,
    countryList,
    setActiveCountry,
    currExchangeCountry,
    setCurrExchangeCountry,
  ]);
  return (
    <>
      <WholeWrapper>
        <GlobalStyles />
        <InputComponent />
        <CountryDetails />

        <StyledNavigationHeader>
          <StyledNavLink
            to={`/${countryId}`}
            active={location?.pathname === `/${countryId}` ? 1 : 0}
          >
            CURRENCY EXCHANGE
          </StyledNavLink>
          <StyledNavLink
            to={`/${countryId}/airports`}
            active={location?.pathname === `/${countryId}/airports` ? 1 : 0}
          >
            AIRPORTS
          </StyledNavLink>
        </StyledNavigationHeader>

        <Route exact path={"/:countryId/"}>
          <CurrencyExchange countryId={countryId} />
        </Route>
        <Route exact path={"/:countryId/airports"}>
          <AirportsComponent />
        </Route>
      </WholeWrapper>
    </>
  );
};

export default MainComponent;

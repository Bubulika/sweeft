import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  BottomBoxWrapper,
  StyledEquality,
  StyledInput,
  StyledInputWrapper,
  StyledSelectComponent,
  StyledTitle,
} from "./components";
import { DataContext } from "../context/DataContext";
import axios from "axios";

const CurrencyExchange = () => {
  const {
    countryList,
    activeCountry,
    currExchangeCountry,
    setCurrExchangeCountry,
  } = useContext(DataContext);
  const [inputFromValue, setInputFromValue] = useState("");
  const [inputToValue, setInputToValue] = useState("");
  const [rate, setRate] = useState();
  const [currenciesArray, setCurrenciesArray] = useState([]);
  const fromCurrency =
    activeCountry?.currencies && Object?.keys(activeCountry?.currencies)[0];
  const toCurrency =
    currExchangeCountry?.currencies &&
    Object?.keys(currExchangeCountry?.currencies)[0];

  const handleSelectChange = (e) => {
    const found = countryList.find(
      (item) => item.name.common === e.target.value
    );

    setCurrExchangeCountry(found);
  };

  const getCurrency = useCallback(async () => {
    const found = currenciesArray.find((item) => item.base === fromCurrency);
    if (found) {
      setRate(found.rates[toCurrency]);
    } else {
      const res =
        fromCurrency &&
        (await axios.get(
          `https://api.exchangerate.host/latest?base=${fromCurrency}`
        ));
      res && setCurrenciesArray((prev) => [...prev, res.data]);

      res && setRate(res.data.rates[toCurrency]);
    }
  }, [fromCurrency, toCurrency, currenciesArray]);

  useEffect(() => {
    getCurrency();
  }, [getCurrency]);

  useEffect(() => {
    setInputToValue(inputFromValue * rate);
  }, [inputFromValue, rate]);
  return (
    <BottomBoxWrapper>
      <StyledTitle>Currency Exchange</StyledTitle>
      <StyledSelectComponent
        value={currExchangeCountry?.name?.common}
        onChange={handleSelectChange}
      >
        {countryList.map((el) => (
          <option value={el?.name?.common} key={el?.name?.common}>
            {el?.name?.common}
          </option>
        ))}
      </StyledSelectComponent>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <StyledInputWrapper>
          <label style={{ color: "rgba(0, 0, 0, 0.54)" }} htmlFor="from">
            {" "}
            {activeCountry?.currencies &&
              activeCountry?.currencies[fromCurrency]?.symbol}
          </label>
          <StyledInput
            id="from"
            value={inputFromValue}
            onChange={(e) => setInputFromValue(e.target.value)}
          />
        </StyledInputWrapper>
        <StyledEquality>=</StyledEquality>
        <StyledInputWrapper>
          <label style={{ color: "rgba(0, 0, 0, 0.54)" }} htmlFor="to">
            {currExchangeCountry?.currencies &&
              currExchangeCountry?.currencies[toCurrency]?.symbol}
          </label>
          <StyledInput disabled id="to" value={inputToValue} />
        </StyledInputWrapper>
      </div>
    </BottomBoxWrapper>
  );
};

export default CurrencyExchange;

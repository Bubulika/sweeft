import { useCallback, useContext, useEffect, useState } from "react";
import {
  BottomBoxWrapper,
  InputDiv,
  StyledInput,
  StyledTitle,
  Div,
  H3,
} from "./components";
import axios from "axios";
import { DataContext } from "../context/DataContext";

function AirportsComponent() {
  const { activeCountry } = useContext(DataContext);
  const [chosenAirports, setChosenAirports] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredArr, setFilteredArr] = useState([]);

  const fetchAirports = useCallback(async () => {
    const res = await axios.get(
      `https://api.api-ninjas.com/v1/airports?country=${activeCountry?.cca2}`,
      {
        headers: {
          "X-Api-Key": "SIPAorhi2j2yvFssY2MS9g==Ax0zlM2dV4eJo6TT",
        },
      }
    );
    const filteredData = res.data.filter((el) => el.iata !== "");
    const joinProperties = filteredData.map(
      (item) => `${item.iata} - ${item.name} (${item.city})`
    );
    setChosenAirports(joinProperties);
  }, [activeCountry]);

  useEffect(() => {
    fetchAirports();
  }, [fetchAirports]);

  function setDebouncedInputValue(value) {
    const arr = [...chosenAirports];
    const newArr = arr.filter((el) =>
      el.toUpperCase().includes(value.toUpperCase())
    );
    setFilteredArr(newArr);
  }

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, 500]);

  return (
    <BottomBoxWrapper>
      <StyledTitle>Airport</StyledTitle>
      <InputDiv>
        <StyledInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for airport"
        />
      </InputDiv>
      <Div>
        {filteredArr.length > 0
          ? filteredArr.map((el) => <H3 key={el}>{el}</H3>)
          : chosenAirports.map((el) => <H3 key={el}>{el}</H3>)}
      </Div>
    </BottomBoxWrapper>
  );
}

export default AirportsComponent;

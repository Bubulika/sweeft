import styled from "styled-components";
import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export default function SelectCountry() {
  const { allCountries, setChosenCountry, chosenCountry } =
    useContext(MainContext);
  const handleChange = (e) => {
    const name = e.target.value;
    setChosenCountry(allCountries.find((el) => el.name.common === name));
  };
  return (
    <Select value={chosenCountry?.name?.common} onChange={handleChange}>
      {allCountries?.map((el) => {
        return (
          <Option value={el?.name?.common} key={el?.name?.common}>
            {el?.name?.common}
          </Option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  width: 80%;
  border-radius: 6px;
  border: 2px solid #d8dbe2;
  height: 70px;
  outline: none;
  padding: 0 10px;
`;

const Option = styled.option``;

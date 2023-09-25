import styled from "styled-components";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function InputComponent() {
  const {
    countryList,
    setActiveCountry,
    activeCountry,
    setCurrExchangeCountry,
    currExchangeCountry,
  } = useContext(DataContext);
  const history = useHistory();

  const HandleChange = (e) => {
    const title = e.target.value;
    const found = countryList.find((item) => item.name.common === title);
    setActiveCountry(found);
    history.push(`/${found?.cca3}`);
    !currExchangeCountry && setCurrExchangeCountry(found);
  };
  return (
    <SelectWrapper>
      <Select value={activeCountry?.name?.common} onChange={HandleChange}>
        <Option value={null} key={"0"}>
          {"Please Choose Country"}
        </Option>

        {countryList.map((item) => (
          <Option value={item?.name?.common} key={item?.name?.common}>
            {item?.name?.common}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
}

export default InputComponent;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
`;

const Select = styled.select`
  height: 60px;
  width: 100%;
  border-radius: 6px;
  border-color: rgba(194, 201, 216, 1);
  color: black;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.75;
  outline: none;
  padding: 10px;
`;
const Option = styled.option`
  color: black;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.75;
  outline: none;
  font-family: "YourFontName";
`;

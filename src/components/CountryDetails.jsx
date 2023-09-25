import styled from "styled-components";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
function CountryDetails() {
  const { activeCountry } = useContext(DataContext);
  function ObjIntoString(obj) {
    let string = "";
    const arr = [];
    for (const key in obj) {
      string = obj[key].name + " (" + obj[key].symbol + ") ";
      arr.push(string);
      string = "";
    }
    return arr.join(", ");
  }
  return (
    <MainWraper>
      <MainContainer>
        <Wraper>
          <CountryTitle>{activeCountry?.name?.common}</CountryTitle>
          <Flag
            src={activeCountry?.flags?.png}
            alt={activeCountry?.flags?.alt}
          />
        </Wraper>
        <WrapperDiv>
          <InformationDiv>
            <KeyDiv>
              <Key>Capital:</Key>
              <Key>Currency:</Key>
              <Key>Region:</Key>
            </KeyDiv>
            <ValueDiv>
              <Value>{activeCountry?.capital}</Value>
              <Value>{ObjIntoString(activeCountry?.currencies)}</Value>
              <Value>
                {activeCountry?.continents},{activeCountry?.subregion}
              </Value>
            </ValueDiv>
          </InformationDiv>
          <InformationDiv>
            <KeyDiv>
              <Key>Continent:</Key>
              <Key>Population:</Key>
              <Key>Borders:</Key>
            </KeyDiv>
            <ValueDiv>
              <Value>{activeCountry?.continents}</Value>
              <Value>{activeCountry?.population?.toLocaleString()}</Value>
              <Value>{activeCountry?.borders?.join(", ")}</Value>
            </ValueDiv>
          </InformationDiv>
        </WrapperDiv>
      </MainContainer>
    </MainWraper>
  );
}

export default CountryDetails;

const MainWraper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 100%;
  margin-top: 24px;
  padding: 16px;
`;
const CountryTitle = styled.h1`
  color: black;
  font-weight: 400;
  font-size: 2.125rem;
  line-height: 1.235;
  letter-spacing: 0.00735em;
`;
const Wraper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Flag = styled.img`
  width: 50px;
  height: 30px;
`;
const WrapperDiv = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 24px;
`;
const InformationDiv = styled.div`
  display: flex;
  width: 50%;
`;
const KeyDiv = styled.div`
  width: 30%;
`;

const ValueDiv = styled.div`
  width: 40%;
`;

const Key = styled.h3`
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  font-weight: 600;
`;
const Value = styled.h3`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
`;

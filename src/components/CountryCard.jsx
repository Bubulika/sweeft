import styled from "styled-components";
import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export default function CountryCard() {
  const { chosenCountry } = useContext(MainContext);

  function parseObj(obj) {
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
    <Container>
      <Div>
        <Title>{chosenCountry?.name?.official}</Title>
        <Img src={chosenCountry?.flags?.png} alt="flag" />
      </Div>

      <MaincWrapper>
        <Wrapper>
          <Titles>
            <P>Capital:</P>
            <P>Currency:</P>
            <P>Region:</P>
          </Titles>
          <Titles>
            <Info>{chosenCountry?.capital}</Info>
            <Info>{parseObj(chosenCountry?.currencies)}</Info>
            <Info>
              {chosenCountry?.continents}, {chosenCountry?.subregion}
            </Info>
          </Titles>
        </Wrapper>
        <Wrapper>
          <Titles>
            <P>Continent:</P>
            <P>Population:</P>
            <P>Borders:</P>
          </Titles>
          <Titles>
            <Info>{chosenCountry?.continents}</Info>
            <Info>{chosenCountry?.population?.toLocaleString()}</Info>
            <Info>{chosenCountry?.borders?.join(", ")}</Info>
          </Titles>
        </Wrapper>
      </MaincWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  margin-top: 30px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
const Title = styled.h1`
  font-size: 40px;
`;
const MaincWrapper = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  width: 50%;
  display: flex;
`;
const Titles = styled.div`
  width: 50%;
`;
const P = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 12px 12px;
`;
const Info = styled.p`
  font-size: 18px;
  margin: 12px 12px;
`;
const Div = styled.div`
  margin: 12px 12px;
  display: flex;
  align-items: center;
  gap: 15px;
`;
const Img = styled.img`
  width: 50px;
  height: 30px;
`;

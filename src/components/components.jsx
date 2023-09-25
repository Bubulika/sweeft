import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";

export const WholeWrapper = styled.div`
  max-width: 1200px;
  border: 1px solid rgb(204, 204, 204);
  padding: 24px;
  margin: 0px auto;
`;

export const StyledNavigationHeader = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  border-bottom: ${(props) =>
    props.active ? " 1px solid rgb(25, 118, 210);" : "unset"};
  padding: 10px 0px;
  color: ${(props) =>
    props.active ? "rgb(25, 118, 210)" : "rgba(0, 0, 0, 0.6)"};
`;

export const BottomBoxWrapper = styled.div`
  width: 100%;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  overflow: hidden;
  padding: 16px;
  margin-top: 20px;
`;

export const StyledTitle = styled.h1`
  color: black;
  font-weight: 400;
  font-size: 2.125rem;
  line-height: 1.235;
  letter-spacing: 0.00735em;
`;

export const StyledSelectComponent = styled.select`
  width: 200px;
  border-top: unset;
  border-right: unset;
  border-left: unset;
  padding: 10px;
  border-bottom: 1px solid;
`;

export const InputDiv = styled.div`
  margin-top: 24px;
`;
export const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  padding: 4px 0px 5px;
  &:hover {
    border-bottom: 2px solid black;
  }
`;

export const StyledEquality = styled.h4`
  font-size: 2.125rem;
  line-height: 1.235;
`;

export const StyledInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Div = styled.div`
  margin-top: 24px;
`;
export const H3 = styled.h4``;

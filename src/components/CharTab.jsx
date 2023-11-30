import React from "react";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import Button from "./Button";

function CharTab({ char, setChar }) {
  return (
    <StDiv>
      <Button
        value="WOODY"
        onClick={() => setChar("woody")}
        clicked={(char === "woody").toString()}
      />
      <Button
        value="BUZZ"
        onClick={() => setChar("buzz")}
        clicked={(char === "buzz").toString()}
      />
      <Button
        value="FORKY"
        onClick={() => setChar("forky")}
        clicked={(char === "forky").toString()}
      />
      <Button
        value="BOPEEP"
        onClick={() => setChar("bopeep")}
        clicked={(char === "bopeep").toString()}
      />
    </StDiv>
  );
}

export default CharTab;

const StDiv = styled.div`
  padding: 15px;
  background-color: ${theme.pink};
  display: flex;
  gap: 15px;
  border-radius: 10px;
  box-shadow: ${theme.boxShadow};
`;

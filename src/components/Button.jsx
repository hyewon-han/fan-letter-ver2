import React from "react";
import styled, { css } from "styled-components";
import { theme } from "../GlobalStyle";

function Button({ value, onClick, clicked, size }) {
  return (
    <StBtn onClick={onClick} clicked={clicked} size={size}>
      {value}
    </StBtn>
  );
}

export default Button;

const StBtn = styled.button`
  ${(props) => {
    switch (props.size) {
      case "large":
        return css`
          height: 50px;
          min-width: 130px;
          max-width: 200px;
        `;
      case "small":
        return css`
          height: 35px;
          min-width: 50px;
          max-width: 100px;
        `;
      default:
        return css`
          height: 50px;
          min-width: 100px;
        `;
    }
  }}
  /* height: 50px;
  width: 100px; */
  border: none;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.clicked === "true" ? theme.yellow : theme.blue};
  color: ${(props) => (props.clicked === "true" ? "black" : "white")};
  padding: 10px;
  border-radius: 10px;
  font-size: 18px;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
`;

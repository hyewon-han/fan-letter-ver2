import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    box-sizing: border-box;
    background-image: url("/toy-story.jpg");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
  }
`;

export const theme = {
  yellow: "#fcbb6d",
  pink: "#d8737f",
  darkPink: "#ab6c82",
  purple: "#685d79",
  blue: "#475c7a",
  boxShadow: "0px 8px 16px 0px #00000033",
};

export default GlobalStyle;

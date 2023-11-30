import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../GlobalStyle";

function Layout({ children }) {
  return (
    <div>
      <StHeader>
        <Link to="/">
          <StSpan>Fan Letter to Toy Story 💌</StSpan>
        </Link>
      </StHeader>
      <StLayout>{children}</StLayout>
      <StFooter>
        <span>
          Copyright &copy; Fan Letter to Toy Story All rights reserved
        </span>
      </StFooter>
    </div>
  );
}

export default Layout;

const StHeader = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 30px 0px;
  font-size: 22px;
`;

const StFooter = styled.footer`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
`;

const StSpan = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 2rem;
  text-shadow: 1px 1px 2px ${theme.blue};
`;

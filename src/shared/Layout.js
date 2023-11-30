import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { theme } from "../GlobalStyle";
import Button from "../components/Button";
import { useSelector } from "react-redux";

function Layout() {
  // const [isLogined, setIsLogined] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  console.log(isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <StHeader>
        <Link to="/">
          <StSpan>Fan Letter to Toy Story 💌</StSpan>
        </Link>
        <Btns>
          <Link to="/profile">
            <Button value="MY PROFILE" />
          </Link>
          <Button value="LOGOUT" />
        </Btns>
      </StHeader>
      <StLayout>
        <Outlet />
      </StLayout>
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
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 30px;
  font-size: 22px;
  background-color: ${theme.yellow};
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
  min-height: 82vh;
`;

const StSpan = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 2rem;
  text-shadow: 1px 1px 2px ${theme.blue};
`;

const Btns = styled.div`
  position: absolute;
  right: 5%;
  width: 13%;
  display: flex;
  justify-content: space-between;
`;

import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import styled from "styled-components";
import { theme } from "../GlobalStyle";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  let isLoginButtonEnabled = false;

  const onChangeInput = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "id") setId(value);
    if (name === "password") setPassword(value);
    if (name === "nickname") setNickname(value);
  };

  if (isLoginPage) {
    isLoginButtonEnabled = id !== "" && password !== "";
  } else {
    isLoginButtonEnabled = id !== "" && password !== "" && nickname !== "";
  }

  console.log(id, password, nickname);

  return (
    <Container>
      {isLoginPage ? (
        <StForm>
          <h1>LOG IN 😀</h1>
          <input
            type="text"
            value={id}
            name="id"
            onChange={onChangeInput}
            required
            placeholder="아이디 (4 ~ 10글자)"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChangeInput}
            required
            placeholder="비밀번호 (4 ~ 15글자)"
          />
          <Btns>
            <Button value="LOGIN" disabled={!isLoginButtonEnabled} />
            <StSpan onClick={() => setIsLoginPage(false)}>JOIN</StSpan>
          </Btns>
        </StForm>
      ) : (
        <StForm>
          <h1>JOIN 😀</h1>
          <input
            type="text"
            value={id}
            name="id"
            onChange={onChangeInput}
            required
            placeholder="아이디 (4 ~ 10글자)"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChangeInput}
            required
            placeholder="비밀번호 (4 ~ 15글자)"
          />
          <input
            type="text"
            value={nickname}
            name="nickname"
            onChange={onChangeInput}
            required
            placeholder="닉네임 (1 ~ 10글자)"
          />
          <Btns>
            <Button value="JOIN" disabled={!isLoginButtonEnabled} />
            <StSpan onClick={() => setIsLoginPage(true)}>LOGIN</StSpan>
          </Btns>
        </StForm>
      )}
    </Container>
  );
}

export default Login;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.form`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: whitesmoke;
  border-radius: 20px;

  & h1 {
    font-size: 22px;
    text-shadow: 1px 1px 2px ${theme.blue};
  }
  & input {
    width: 100%;
    height: 30px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    &:focus {
      outline: 1px solid ${theme.blue};
    }
  }
`;

const StSpan = styled.span`
  cursor: pointer;
`;

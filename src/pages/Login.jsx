import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import authApi from "../axios/authApi";
import { useDispatch } from "react-redux";
import { loginUser, signUpUser } from "../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const dispatch = useDispatch();
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

  const signIn = async (e) => {
    e.preventDefault();
    const signInObj = {
      id,
      password,
    };
    try {
      const response = await authApi.post("/login", signInObj);
      const accessToken = response.data.accessToken;
      const avatar = response.data.avatar;
      const nickname = response.data.nickname;
      const userId = response.data.userId;
      dispatch(loginUser({ accessToken, avatar, nickname, userId }));
      const notify = () => toast("로그인 성공!");
      notify();
    } catch (error) {
      console.log(error);
      const { response } = error;
      const notify = () => toast(response.data.message);
      notify();
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    const signUpObj = {
      id,
      password,
      nickname,
    };
    try {
      const response = await authApi.post("/register", signUpObj);
      console.log(response.data);
      dispatch(signUpUser());
      const notify = () => toast(response.data.message);
      notify();
    } catch (error) {
      const { response } = error;
      console.log(response);
      const notify = () => toast(response.data.message);
      notify();
    }
  };

  return (
    <Container>
      <ToastContainer />
      {isLoginPage ? (
        <StForm onSubmit={signIn}>
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
        <StForm onSubmit={signUp}>
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

import React, { useEffect, useState } from "react";
import CharTab from "../components/CharTab";
import Form from "../components/Form";
import Comment from "../components/Comment";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { __getData } from "../redux/modules/commentSlice";
import jsonApi from "../axios/jsonApi";
import authApi from "../axios/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../redux/modules/authSlice";

function Home() {
  const { letters } = useSelector((state) => state.commentSlice);
  // console.log(data);
  const { accessToken } = useSelector((state) => state.authSlice);
  const [char, setChar] = useState("woody");
  const dispatch = useDispatch();
  console.log(accessToken);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const notify = () => toast("로그인 성공!");
  //     notify();
  //   }
  // }, []);

  useEffect(() => {
    dispatch(__getData());
  }, []);

  const refreshToken = async () => {
    try {
      const response = await authApi.get("/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log("error", error.response.data.message);
      const notify = () => toast(error.response.data.message);
      notify();
      dispatch(logoutUser());
    }
  };
  refreshToken();
  return (
    <>
      <ToastContainer />
      <CharTab char={char} setChar={setChar} />
      <Form setChar={setChar} />
      <div>
        {letters
          ?.filter((comment) => comment.writedTo === char)
          .sort((a, b) => {
            const result = a.createdAt < b.createdAt ? 1 : -1;
            return result;
          })
          .map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        {letters?.filter((comment) => comment.writedTo === char).length ===
        0 ? (
          <StDiv>{char} 에게 첫번째 코멘트를 남겨주세요! 😆</StDiv>
        ) : null}
      </div>
    </>
  );
}

export default Home;

const StDiv = styled.div`
  background-color: black;
  color: white;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 22px;
`;

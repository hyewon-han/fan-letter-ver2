import React, { useEffect, useState } from "react";
import CharTab from "../components/CharTab";
import Form from "../components/Form";
import Comment from "../components/Comment";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { __getData } from "../redux/modules/commentSlice";
import jsonApi from "../axios/jsonApi";
import { useNavigate } from "react-router-dom";

function Home() {
  const { letters } = useSelector((state) => state.commentSlice);
  // console.log(data);
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  const [char, setChar] = useState("woody");
  const dispatch = useDispatch();
  const [lettersData, setLettersData] = useState([]);
  const navigate = useNavigate();
  console.log("lettersData", lettersData);
  // const fetchLetters = async () => {
  //   const { data } = await jsonApi.get("/letters");
  //   console.log(data);
  //   setLetters(data);
  // };

  // useEffect(() => {
  //   if (isLoggedIn === false) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const notify = () => toast("로그인 성공!");
      notify();
    }
  }, []);

  // useEffect(() => {
  //   fetchLetters();
  // }, []);

  useEffect(() => {
    dispatch(__getData());
  }, [dispatch]);

  useEffect(() => {
    setLettersData(letters);
  }, [letters]);

  return (
    <>
      <ToastContainer />
      <CharTab char={char} setChar={setChar} />
      <Form setChar={setChar} />
      <div>
        {lettersData
          ?.filter((comment) => comment.writedTo === char)
          .map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        {lettersData?.filter((comment) => comment.writedTo === char).length ===
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

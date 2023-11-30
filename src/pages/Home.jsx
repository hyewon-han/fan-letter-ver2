import React, { useEffect, useState } from "react";
import CharTab from "../components/CharTab";
import Form from "../components/Form";
import Comment from "../components/Comment";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const data = useSelector((state) => state.commentSlice);
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  console.log(data);
  const [char, setChar] = useState("woody");

  useEffect(() => {
    if (isLoggedIn) {
      const notify = () => toast("로그인 성공!");
      notify();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <CharTab char={char} setChar={setChar} />
      <Form setChar={setChar} />
      <div>
        {data
          .filter((comment) => comment.writedTo === char)
          .map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        {data.filter((comment) => comment.writedTo === char).length === 0 ? (
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

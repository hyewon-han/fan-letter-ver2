import React, { useState } from "react";
import CharTab from "../components/CharTab";
import Form from "../components/Form";
import Comment from "../components/Comment";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import authApi from "../axios/authApi";
import { logoutUser } from "../redux/modules/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getLetters } from "../api/queryFns";

function Home() {
  const { accessToken } = useSelector((state) => state.authSlice);
  const [char, setChar] = useState("woody");
  const dispatch = useDispatch();

  const {
    data: letters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["letters"],
    queryFn: getLetters,
  });

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
      toast.error(error.response.data.message);
      dispatch(logoutUser());
    }
  };
  refreshToken();
  if (error) {
    return <StDiv>{error.message}</StDiv>;
  }
  return (
    <>
      <CharTab char={char} setChar={setChar} />
      <Form setChar={setChar} />
      {isLoading ? (
        <StDiv>로딩중...</StDiv>
      ) : (
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
      )}
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

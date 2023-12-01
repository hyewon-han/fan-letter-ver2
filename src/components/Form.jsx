import React, { useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";

import { useDispatch, useSelector } from "react-redux";
import { __createData, createData } from "../redux/modules/commentSlice";

function Form({ setChar }) {
  const [content, setContent] = useState("");
  const id = uuidv4();
  const selectRef = useRef();
  const dispatch = useDispatch();
  const { avatar, nickname, userId } = useSelector((state) => state.authSlice);

  const selectChar = () => {
    const selectedChar = selectRef.current.value;
    setChar(selectRef.current.value);
    return selectedChar;
  };

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());

  const createComment = (e) => {
    e.preventDefault();
    const commentObj = {
      createdAt: formattedDate,
      nickname,
      avatar:
        "https://tse2.mm.bing.net/th?id=OIP.Nen6j3vBZdl8g8kzNfoEHQAAAA&pid=Api&P=0&h=220",
      content,
      writedTo: selectChar(),
      id,
      userId,
    };
    dispatch(__createData(commentObj));

    setContent("");
  };
  return (
    <StForm onSubmit={createComment}>
      <StDiv>
        <label htmlFor="name">nickname</label>
        <p>{nickname}</p>

        <label htmlFor="content">content</label>
        <StTextarea
          id="content"
          type="text"
          placeholder="Write your content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          required
          maxLength={80}
        />

        <label htmlFor="select">Whose fan are you?</label>
        <StSelect id="select" onChange={selectChar} ref={selectRef}>
          <option value="woody">Woody</option>
          <option value="buzz">Buzz</option>
          <option value="forky">Forky</option>
          <option value="bopeep">Bopeep</option>
        </StSelect>
      </StDiv>
      <Button value="Submit" />
    </StForm>
  );
}

export default Form;

const StForm = styled.form`
  margin-top: 15px;
  background-color: ${theme.darkPink};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  box-shadow: ${theme.boxShadow};
`;

const StInput = styled.input`
  width: 300px;
  height: 20px;
  border-radius: 10px;
  border: none;
  transition: all 0.3s ease-in-out;
  &:focus {
    border: 1px solid ${theme.blue};
    outline: 1px ridge ${theme.blue};
  }
`;

const StDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
`;

const StTextarea = styled.textarea`
  width: 300px;
  height: 150px;
  resize: none;
  border-radius: 10px;
  border: none;
  transition: all 0.3s ease-in-out;
  &:focus {
    border: 1px solid ${theme.blue};
    outline: 1px ridge ${theme.blue};
  }
`;

const StSelect = styled.select`
  width: 300px;
  height: 25px;
  border-radius: 10px;
  border: none;
  &:focus {
    border: 1px solid ${theme.blue};
    outline: 1px ridge ${theme.blue};
  }
`;

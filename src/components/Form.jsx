import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import { Context } from "../Context";
import { useDispatch } from "react-redux";
import { createData } from "../redux/modules/commentSlice";

function Form({ setChar }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const id = uuidv4();
  const selectRef = useRef();
  const dispatch = useDispatch();

  const selectChar = () => {
    const selectedChar = selectRef.current.value;
    setChar(selectRef.current.value);
    return selectedChar;
  };

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  const createComment = (e) => {
    e.preventDefault();
    const commentObj = {
      createdAt: formattedDate,
      name,
      avatar:
        "https://tse2.mm.bing.net/th?id=OIP.Nen6j3vBZdl8g8kzNfoEHQAAAA&pid=Api&P=0&h=220",
      content,
      writedTo: selectChar(),
      id,
    };
    dispatch(createData(commentObj));
    setName("");
    setContent("");
  };
  return (
    <StForm onSubmit={createComment}>
      <StDiv>
        <label htmlFor="name">name</label>
        <StInput
          id="name"
          type="text"
          placeholder="Write your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          maxLength={10}
        />

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

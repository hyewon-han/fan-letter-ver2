import React, { useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import defaultUser from "../assets/default-user.jpeg";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLetter } from "../api/mutationFns";

function Form({ setChar }) {
  const [content, setContent] = useState("");
  const id = uuidv4();
  const selectRef = useRef();
  const { avatar, nickname, userId } = useSelector((state) => state.authSlice);
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addLetter,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["letters"]);
    },
  });

  const selectChar = () => {
    const selectedChar = selectRef.current.value;
    setChar(selectRef.current.value);
    return selectedChar;
  };

  const createComment = (e) => {
    e.preventDefault();
    const commentObj = {
      createdAt: Date.now(),
      nickname,
      avatar: avatar ?? defaultUser,
      content,
      writedTo: selectChar(),
      id,
      userId,
    };
    mutateToAdd(commentObj);
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

        <label htmlFor="select">Who is your favorite?</label>
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

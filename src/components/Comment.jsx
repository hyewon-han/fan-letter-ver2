import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../GlobalStyle";

function Comment({ comment }) {
  return (
    <Link to={`/detail/${comment.id}`}>
      <CommentBox>
        <StImg src={comment.avatar} />
        <div>
          <StSpan>{comment.nickname}</StSpan>
          <p>{comment.createdAt}</p>
          <p>
            {comment.content?.length > 40
              ? `${comment.content.slice(0, 40)}...`
              : comment.content}
          </p>
        </div>
      </CommentBox>
    </Link>
  );
}

export default Comment;

const CommentBox = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px;
  background-color: ${theme.pink};
  padding: 15px;
  border-radius: 10px;
  box-shadow: ${theme.boxShadow};
  width: 450px;
  height: 100px;
  transition: 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const StImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: ${theme.boxShadow};
`;

const StSpan = styled.span`
  font-weight: 700;
`;

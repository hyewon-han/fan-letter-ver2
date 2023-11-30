import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import Button from "../components/Button";
import { Context } from "../Context";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, updateData } from "../redux/modules/comment";

function Detail() {
  const data = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  // const { data, setData } = useContext(Context);
  const { id } = useParams();
  const comment = data.find((item) => item.id === id);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [textarea, setTextarea] = useState(comment.content);
  const navigate = useNavigate();

  const updateComment = () => {
    if (textarea === comment.content) alert("수정사항이 없습니다.");
    else {
      const result = window.confirm("이대로 수정하시겠습니까?");
      if (result) {
        dispatch(updateData({ id, textarea }));
        navigate("/");
      }
    }
  };

  const deleteComment = () => {
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      dispatch(deleteData(id));
      navigate("/");
    }
  };
  return (
    <Wrap>
      <CommentBox>
        <StDiv>
          <StImg src={comment.avatar} />
          <div>
            <StP>{comment.name}</StP>
            <p>To. {comment.writedTo}</p>
            <p>{comment.createdAt}</p>
          </div>
          <StTextarea
            type="text"
            value={textarea}
            disabled={isInputDisabled}
            onChange={(e) => setTextarea(e.target.value)}
          />
        </StDiv>
        <Btns>
          {isInputDisabled ? (
            <>
              <Button value="수정" onClick={() => setIsInputDisabled(false)} />
              <Button value="삭제" onClick={deleteComment} />
            </>
          ) : (
            <>
              <Button value="수정완료" onClick={updateComment} />
              <Button value="취소" onClick={() => setIsInputDisabled(true)} />
            </>
          )}
        </Btns>
      </CommentBox>
    </Wrap>
  );
}

export default Detail;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 10px;
  background-color: ${theme.pink};
  padding: 15px;
  border-radius: 10px;
  box-shadow: ${theme.boxShadow};
`;

const StImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: ${theme.boxShadow};
`;

const StTextarea = styled.textarea`
  width: 300px;
  height: 200px;
  resize: none;
`;

const Wrap = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Btns = styled.div`
  width: 300px;
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const StP = styled.p`
  font-weight: 700;
  font-size: 20px;
`;

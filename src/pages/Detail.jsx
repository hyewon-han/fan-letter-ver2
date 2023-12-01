import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../redux/modules/authSlice";
import authApi from "../axios/authApi";
import {
  __deleteData,
  __getData,
  __updateData,
} from "../redux/modules/commentSlice";

function Detail() {
  const { letters } = useSelector((state) => state.commentSlice);
  const dispatch = useDispatch();
  const { id } = useParams();
  const comment = letters.find((item) => item.id === id);
  const { avatar, nickname, createdAt, writedTo, content } = letters.find(
    (item) => item.id === id
  );
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [textarea, setTextarea] = useState(comment?.content);
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.authSlice);
  const { accessToken } = useSelector((state) => state.authSlice);
  console.log(comment?.userId);
  console.log(userId);
  const updateComment = () => {
    if (textarea === comment?.content) alert("수정사항이 없습니다.");
    else {
      const result = window.confirm("이대로 수정하시겠습니까?");
      if (result) {
        dispatch(__updateData({ id, textarea }));
        navigate("/");
      }
    }
  };

  const deleteComment = () => {
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteData(id));
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(__getData());
    setTextarea(comment?.content);
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
    <Wrap>
      <CommentBox>
        <StDiv>
          <StImg src={comment?.avatar} />
          <div>
            <StP>{comment?.nickname}</StP>
            <p>To. {comment?.writedTo}</p>
            <p>{comment?.createdAt}</p>
          </div>
        </StDiv>

        {userId === comment.userId ? (
          isInputDisabled ? (
            <>
              <CommentContent>{comment?.content}</CommentContent>
              <Btns>
                <Button
                  value="수정"
                  onClick={() => setIsInputDisabled(false)}
                />
                <Button value="삭제" onClick={deleteComment} />
              </Btns>
            </>
          ) : (
            <>
              <StTextarea
                type="text"
                defaultValue={content}
                disabled={isInputDisabled}
                onChange={(e) => setTextarea(e.target.value)}
              />
              <Btns>
                <Button value="수정완료" onClick={updateComment} />
                <Button value="취소" onClick={() => setIsInputDisabled(true)} />
              </Btns>
            </>
          )
        ) : isInputDisabled ? (
          <>
            <CommentContent>{comment?.content}</CommentContent>
          </>
        ) : (
          <StTextarea
            type="text"
            defaultValue={content}
            disabled={isInputDisabled}
            onChange={(e) => setTextarea(e.target.value)}
          />
        )}
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

const CommentContent = styled.div`
  width: 300px;
  height: 150px;
`;

const StTextarea = styled.textarea`
  width: 300px;
  height: 150px;
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

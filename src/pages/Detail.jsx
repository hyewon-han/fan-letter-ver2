import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../redux/modules/authSlice";
import authApi from "../axios/authApi";
import { getFormattedDate } from "../util/date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLetters } from "../api/queryFns";
import { deleteLetter, editLetter } from "../api/mutationFns";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [textarea, setTextarea] = useState();
  const navigate = useNavigate();
  const myUserId = useSelector((state) => state.authSlice.userId);
  const { accessToken } = useSelector((state) => state.authSlice);

  const { data: letters } = useQuery({
    queryKey: ["letters"],
    queryFn: getLetters,
  });

  const queryClient = useQueryClient();
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteLetter,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["letters"]);
    },
  });

  const { mutate: mutateToEdit } = useMutation({
    mutationFn: editLetter,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["letters"]);
    },
  });
  const updateComment = () => {
    if (textarea === content) alert("수정사항이 없습니다.");
    else {
      const result = window.confirm("이대로 수정하시겠습니까?");
      if (result) {
        mutateToEdit({ id, textarea });
        navigate("/");
      }
    }
  };

  const deleteComment = () => {
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      mutateToDelete(id);
      navigate("/");
    }
  };

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
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(logoutUser());
    }
  };
  refreshToken();
  const { avatar, nickname, createdAt, writedTo, content, userId } =
    letters.find((letter) => letter.id === id);
  return (
    <Wrap>
      <CommentBox>
        <StDiv>
          <StImg src={avatar} />
          <div>
            <StP>{nickname}</StP>
            <p>To. {writedTo}</p>
            <p>{getFormattedDate(createdAt)}</p>
          </div>
        </StDiv>

        {myUserId === userId ? (
          isInputDisabled ? (
            <>
              <CommentContent>{content}</CommentContent>
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
        ) : (
          <CommentContent>{content}</CommentContent>
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
  min-height: 150px;
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

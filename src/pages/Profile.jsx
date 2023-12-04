import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { theme } from "../GlobalStyle";
import Button from "../components/Button";
import authApi from "../axios/authApi";
import { toast } from "react-toastify";
import { editUser, logoutUser } from "../redux/modules/authSlice";
import { __getUserLetters, __updateUser } from "../redux/modules/commentSlice";
import defaultUser from "../assets/default-user.jpeg";

function Profile() {
  const { accessToken, avatar, nickname, userId } = useSelector(
    (state) => state.authSlice
  );
  const { userLetters } = useSelector((state) => state.commentSlice);
  const targetIds = userLetters.map((item) => item.id);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedNickname, setModifiedNickname] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [modifiedAvatar, setModifiedAvatar] = useState(avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getUserLetters(userId));
  }, [dispatch, userId]);

  const handleAvatarClick = () => {
    if (isEditing) {
      document.getElementById("fileInput").click();
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const imgUrl = URL.createObjectURL(selectedFile);
    setImagePreview(imgUrl);
    setModifiedAvatar(selectedFile);
  };

  const onEditDone = async () => {
    const formData = new FormData();
    formData.append("avatar", modifiedAvatar);
    formData.append("nickname", modifiedNickname);
    try {
      const { data } = await authApi.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("data", data);
      toast.success(data.message);
      const edittedNickname = data.nickname;
      const edittedAvatar = data.avatar;
      // authApi patch 요청
      dispatch(
        editUser({
          nickname: edittedNickname || nickname,
          avatar: edittedAvatar || avatar,
        })
      );
      // jsonApi patch 요청
      dispatch(
        __updateUser({
          targetIds,
          nickname: edittedNickname || nickname,
          avatar: edittedAvatar || avatar,
        })
      );
      setIsEditing(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
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
      console.log("error", error.response.data.message);
      toast.error(error.response.data.message);
      dispatch(logoutUser());
    }
  };
  refreshToken();
  return (
    <>
      <ProfileBox>
        <h2>MY PROFILE</h2>
        <Avatar
          src={imagePreview || avatar || defaultUser}
          onClick={handleAvatarClick}
          isediting={isEditing.toString()}
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {isEditing ? (
          <>
            <StInput
              defaultValue={nickname}
              autoFocus
              onChange={(e) => setModifiedNickname(e.target.value)}
            />
            <div>{userId}</div>
            <Btns>
              <Button value="취소" onClick={() => setIsEditing(false)} />
              <Button
                value="수정완료"
                onClick={onEditDone}
                disabled={!modifiedNickname && modifiedAvatar === avatar}
              />
            </Btns>
          </>
        ) : (
          <>
            <div>{nickname}</div>
            <div>{userId}</div>
            <Button value="수정" onClick={() => setIsEditing(true)} />
          </>
        )}
      </ProfileBox>
    </>
  );
}

export default Profile;

const ProfileBox = styled.div`
  width: 500px;
  height: 500px;
  background-color: whitesmoke;
  margin: auto 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 20px;
  box-shadow: ${theme.boxShadow};
  & h2 {
    font-size: 22px;
    font-weight: 800;
  }
`;

const Avatar = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  box-shadow: ${theme.boxShadow};
  &:hover {
    ${(props) =>
      props.isediting === "true"
        ? css`
            cursor: pointer;
          `
        : css`
            cursor: default;
          `}
  }
`;

const StInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 10px;
  border: none;
  transition: all 0.3s ease-in-out;
  &:focus {
    border: 1px solid ${theme.blue};
    outline: 1px ridge ${theme.blue};
  }
`;

const Btns = styled.div`
  width: 300px;
  display: flex;
  gap: 15px;
  justify-content: center;
`;

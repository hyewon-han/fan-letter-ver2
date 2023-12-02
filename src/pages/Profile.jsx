import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import Button from "../components/Button";
import authApi from "../axios/authApi";
import { ToastContainer, toast } from "react-toastify";
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
  const [modifiedAvatar, setModifiedAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getUserLetters(userId));
  }, []);

  const handleAvatarClick = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile);
    // const imgUrl = URL.createObjectURL(selectedFile);
    // console.log("imgUrl", imgUrl);
    setModifiedAvatar(selectedFile);

    if (selectedFile) {
      // FileReader를 사용하여 이미지 파일을 Base64로 읽음
      const reader = new FileReader();
      reader.onloadend = () => {
        // 읽어들인 이미지 데이터를 상태로 설정하여 프리뷰 갱신
        setImagePreview(reader.result);
      };
      // 이미지 파일을 Base64로 읽어들임
      reader.readAsDataURL(selectedFile);
    }
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
      const notify = () => toast(data.message);
      notify();
      const edittedNickname = data.nickname;
      const edittedAvatar = data.avatar;
      dispatch(
        editUser({
          nickname: edittedNickname || nickname,
          avatar: edittedAvatar || avatar,
        })
      );
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

      const notify = () => toast(error.response.data.message);
      notify();
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
      const notify = () => toast(error.response.data.message);
      notify();
      dispatch(logoutUser());
    }
  };
  refreshToken();
  return (
    <>
      <ToastContainer />
      <ProfileBox>
        <h2>MY PROFILE</h2>
        <Avatar
          src={imagePreview || avatar || defaultUser}
          onClick={handleAvatarClick}
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
              onChange={(e) => setModifiedNickname(e.target.value)}
            />
            <div>{userId}</div>
            <Btns>
              <Button value="취소" onClick={() => setIsEditing(false)} />
              <Button value="수정완료" onClick={onEditDone} />
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
    cursor: pointer;
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

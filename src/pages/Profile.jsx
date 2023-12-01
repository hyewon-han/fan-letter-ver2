import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import Button from "../components/Button";

function Profile() {
  const { avatar, nickname, userId } = useSelector((state) => state.authSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedNickname, setModifiedNickname] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const handleAvatarClick = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileChange = (e) => {
    // 파일 선택이 변경되었을 때 원하는 작업 수행
    const selectedFile = e.target.files[0];
    console.log("선택된 파일:", selectedFile);
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
  return (
    <ProfileBox>
      <h2>MY PROFILE</h2>
      <Avatar src={imagePreview || avatar} onClick={handleAvatarClick} />
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {isEditing ? (
        <>
          <input
            defaultValue={nickname}
            value={modifiedNickname}
            onChange={(e) => setModifiedNickname(e.target.value)}
          />
          <div>{userId}</div>
          <div>
            <Button value="취소" onClick={() => setIsEditing(false)} />
            <Button value="수정완료" />
          </div>
        </>
      ) : (
        <>
          <div>{nickname}</div>
          <div>{userId}</div>
          <Button value="수정" onClick={() => setIsEditing(true)} />
        </>
      )}
    </ProfileBox>
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

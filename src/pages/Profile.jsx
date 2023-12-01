import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { theme } from "../GlobalStyle";
import Button from "../components/Button";

function Profile() {
  const { avatar, nickname, userId } = useSelector((state) => state.authSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedNickname, setModifiedNickname] = useState();
  return (
    <ProfileBox>
      <h2>MY PROFILE</h2>
      <Avatar src={avatar} />
      {isEditing ? (
        <>
          <input
            defaultValue={nickname}
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
`;

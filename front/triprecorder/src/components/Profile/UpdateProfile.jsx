import React, { useState } from "react";
import styled from "styled-components";

const DivBox = styled.div`
  position: absolute;
  width: 60%;
  border: 3px solid #7fb77e;
  border-radius: 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 40px; /* 수정: 내용의 크기를 더 크게 조정 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; /* 수정: 요소들 사이의 간격을 더 크게 조정 */
`;

const Btn = styled.button`
  background: #7fb77e;
  margin: 25px auto;
  display: inline-block;
  padding: 15px 30px;
  border-radius: 20px;
  border: none;
  color: #f7f6dc;
  font: bold;
`;

const ProfilePictureContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfilePicture = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadButton = styled.button`
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px; /* 수정: 레이블 간격을 더 크게 조정 */
`;

const LabelText = styled.span`
  margin-right: 10px;
  width: 120px;
`;

const InputField = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profileMessage, setProfileMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.value);
  };

  const handleProfileMessageChange = (event) => {
    setProfileMessage(event.target.value);
  };

  const handleProfilePictureUpload = (event) => {
    // 프로필 사진 업로드 로직
    // 선택된 파일을 처리하고 프로필 사진 상태 업데이트
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 프로필 수정 제출 로직
  };

  return (
    <DivBox>
      <h1>회원 정보 수정</h1>
      <form onSubmit={handleSubmit}>
        <InputLabel>
          <LabelText>이름:</LabelText>
          <InputField type="text" value={name} onChange={handleNameChange} />
        </InputLabel>
        <InputLabel>
          <LabelText>성별:</LabelText>
          <InputField
            type="text"
            value={gender}
            onChange={handleGenderChange}
          />
        </InputLabel>
        <InputLabel>
          <LabelText>닉네임:</LabelText>
          <InputField
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </InputLabel>
        <InputLabel>
          <LabelText>이메일:</LabelText>
          <InputField type="email" value={email} onChange={handleEmailChange} />
        </InputLabel>
        <InputLabel>
          <LabelText>비밀번호:</LabelText>
          <InputField
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputLabel>
        <InputLabel>
          <LabelText>프로필메시지:</LabelText>
          <textarea
            value={profileMessage}
            onChange={handleProfileMessageChange}
          ></textarea>
        </InputLabel>
        <InputLabel>
          <LabelText>프로필사진:</LabelText>
          <ProfilePictureContainer>
            <ProfilePicture src={profilePicture} alt="프로필 사진" />
            <FileInput
              type="file"
              onChange={handleProfilePictureUpload}
              accept="image/*"
            />
            <UploadButton>사진 업로드</UploadButton>
          </ProfilePictureContainer>
        </InputLabel>
        <Btn type="submit">변경 사항 저장</Btn>
      </form>
    </DivBox>
  );
};

export default UpdateProfile;

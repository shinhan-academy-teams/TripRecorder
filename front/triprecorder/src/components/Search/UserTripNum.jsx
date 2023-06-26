import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../style/searchProfile.scss";
import User from "./User";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SnsBox = styled.div`
  display: inline-block;
  width: 35%;
  span {
    display: inline-block;
    font-size: 13px;
    width: 40%;
    text-align: center;
  }
  .type {
    width: 50%;
    text-align: center;
  }
`;

const UserTripNum = ({ userNo, userNick, userProfile }) => {
  const navigate = useNavigate();
  const [tripNum, setTripNum] = useState(0);
  const [snsNum, setSnsNum] = useState(0);

  // 여행 카테고리, sns 게시글 수 로드
  useEffect(() => {
    axios
      .get("/search/data/" + userNo)
      .then((res) => {
        console.log(res);
        setTripNum(res.data.tripNum);
        setSnsNum(res.data.snsNum);
      })
      .catch((err) => console.log("error", err));
  }, []);

  // 누르면 사용자 프로필로 이동
  const userClick = () => {
    navigate("/" + userNick);
  };
  return (
    <div>
      <div
        onClick={userClick}
        style={{ width: "15%", display: "inline-block" }}
      >
        <User userNick={userNick} src={userProfile} userNo={userNo} />
      </div>
      <SnsBox>
        <span>여행 카테고리: {tripNum}개 </span>
        <span>게시글: {snsNum}개</span>
      </SnsBox>
    </div>
  );
};

export default UserTripNum;

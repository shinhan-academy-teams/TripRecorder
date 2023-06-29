import App from "App";
import { Home } from "pages";
import React from "react";

const LevelCheck = () => {
  const user = localStorage.getItem("userNick");
  console.log("레벨 체크");
  return (
    <>
      {/* {user.response.level === 0 ? (
        <App />
      ) : // (
      user.response.level === 1 ? (
        <App />
      ) : (
        <GroupList />
      )} */}
      {/* <h1>LevelCheck</h1> */}
      {/* <App /> */}
      <h1>로그인 상태</h1>
    </>
  );
};

export default LevelCheck;

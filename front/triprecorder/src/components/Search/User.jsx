// import { Avatar } from "@mui/material";
import { Avatar, Divider, Tooltip } from "antd";
import React from "react";
import "../../style/searchProfile.scss";

const User = ({ userNick, src }) => {
  return (
    <div className="suggestions">
      {/* <div className="suggestions__title">검색창</div> */}
      <div className="suggestions__usernames">
        <div className="suggestions__username">
          <div className="username__left">
            <span className="avatar">
              <Avatar src={src}>Rdwd</Avatar>
            </span>
            <div className="username__info">
              <span className="username">{userNick}</span>
              <span className="relation">UserId</span>
            </div>
          </div>
          {/* <button className="follow__button">UserId</button> */}
        </div>
      </div>
    </div>
  );
};

export default User;
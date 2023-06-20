// import { Avatar } from "@mui/material";
import { Avatar, Divider, Tooltip } from "antd";
import React from "react";
import "../../style/profile2.module.scss";

const userState = () => {
  return (
    <div className="suggestions">
      <div className="suggestions__title">검색창</div>
      <div className="suggestions__usernames">
        <div className="suggestions__username">
          <div className="username__left">
            <span className="avatar">
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1">
                R
              </Avatar>
            </span>
            <div className="username__info">
              <span className="username">주용준</span>
              <span className="relation">####</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div>

        {/* <div className="suggestions__username">
          <div className="username__left">
            <span className="avatar">
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1">
                R
              </Avatar>
            </span>
            <div className="username__info">
              <span className="username">redian_</span>
              <span className="relation">New to Instagram</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div>

        <div className="suggestions__username">
          <div className="username__left">
            <span className="avatar">
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1">
                R
              </Avatar>
            </span>
            <div className="username__info">
              <span className="username">redian_</span>
              <span className="relation">New to Instagram</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div>

        <div className="suggestions__username">
          <div className="username__left">
            <span className="avatar">
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1">
                R
              </Avatar>
            </span>
            <div className="username__info">
              <span className="username">redian_</span>
              <span className="relation">New to Instagram</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div> */}
      </div>
    </div>
  );
};

export default userState;

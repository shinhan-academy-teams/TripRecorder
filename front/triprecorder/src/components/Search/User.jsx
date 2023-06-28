// import { Avatar } from "@mui/material";
import { Avatar, Divider, Tooltip } from "antd";
import React from "react";
import "../../style/searchProfile.scss";
import { Link, useNavigate } from "react-router-dom";
import { followerModalState, followingModalState } from "../../recoil/Profile";
import { useRecoilState } from "recoil";

const User = ({ userNick, src, userNo }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useRecoilState(followerModalState);
  const [isfollowingOpen, setIsFollowingOpen] =
    useRecoilState(followingModalState);
  return (
    <div className="suggestions">
      {/* <div className="suggestions__title">검색창</div> */}
      <div className="suggestions__usernames">
        <div
          className="suggestions__username"
          onClick={() => {
            navigate(`/${userNick}`);
            setIsModalOpen(false);
            setIsFollowingOpen(false);
          }}
        >
          <div className="username__left">
            <span className="avatar">
              {/* <Link to={}> */}
              <Avatar src={src}>Rdwd</Avatar>
              {/* </Link> */}
            </span>
            <div className="username__info">
              <span className="username">{userNick}</span>
            </div>
          </div>
          {/* <button className="follow__button">UserId</button> */}
        </div>
      </div>
    </div>
  );
};

export default User;

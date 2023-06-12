import React, { useState } from "react";
import Logo from "assets/recorder_green.png";
import Profile from "assets/profile.png";
import {
  LogoutOutlined,
  SearchOutlined,
  PlusOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import "style/navbar.scss";

import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  return (
    <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
      <div
        className={
          closeMenu === false ? "logoContainer" : "logoContainer active"
        }
      >
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="logo" style={{ width: 48 }} />
        </Link>
        <Link to={"/"} className="link">
          <h2 className="title">TripRecorder </h2>
        </Link>
      </div>
      <div
        className={
          closeMenu === false ? "burgerContainer" : "burgerContainer active"
        }
      >
        <div
          className="burgerTrigger"
          onClick={() => {
            handleCloseMenu();
          }}
        ></div>
        <div className="burgerMenu"></div>
      </div>
      <div
        className={
          closeMenu === false ? "profileContainer" : "profileContainer active"
        }
      >
        <img src={Profile} alt="profile" className="profile" />
        <div className="profileContents">
          <p className="name">Hello, zzahee✈️</p>
          <p>zzahee366@gmail.com</p>
        </div>
      </div>
      <div
        className={
          closeMenu === false ? "contentsContainer" : "contentsContainer active"
        }
      >
        <ul>
          <li className={location.pathname === "/login" ? "active" : ""}>
            <Link to={"/"} className="link_icon">
              <LogoutOutlined
                style={{ padding: "0 1rem 0 0.5rem", fontSize: "20px" }}
              />
            </Link>
            <Link to={"/"}>로그아웃</Link>
          </li>

          <li className={location.pathname === "/search" ? "active" : ""}>
            <Link to={"/search"} className="link_icon">
              <SearchOutlined
                style={{ padding: "0 1rem 0 0.5rem", fontSize: "20px" }}
              />
            </Link>
            <Link to={"/search"}>검색</Link>
          </li>
          <li
            className={
              location.pathname === "/tripregistration" ? "active" : ""
            }
          >
            <Link to={"/tripregistration"} className="link_icon">
              <PlusOutlined
                style={{ padding: "0 1rem 0 0.5rem", fontSize: "20px" }}
              />
            </Link>
            <Link to={"/tripregistration"}>여행등록</Link>
          </li>
          <li className={location.pathname === "/popularcard" ? "active" : ""}>
            <Link to={"/popularcard"} className="link_icon">
              <CreditCardOutlined
                style={{ padding: "0 1rem 0 0.5rem", fontSize: "20px" }}
              />
            </Link>
            <Link to={"/popularcard"}>인기카드</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

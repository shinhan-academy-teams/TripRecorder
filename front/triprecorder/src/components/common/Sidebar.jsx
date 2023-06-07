import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "components/common/SidebarItem";
import "style/sidebar.css";
import logo from "assets/tripRecorder.png";
import {
  LoginOutlined,
  SearchOutlined,
  PlusSquareOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

function Sidebar(props) {
  const menus = [
    { icon: <LoginOutlined />, name: "로그인", path: "/login" },
    { icon: <SearchOutlined />, name: "검색", path: "/searh" },
    {
      icon: <PlusSquareOutlined />,
      name: "여행등록",
      path: "/tripregistration",
    },
    { icon: <CreditCardOutlined />, name: "인기카드", path: "/popularcard" },
  ];

  return (
    <div className="sidebar">
      <Link to={"/"}>
        <img className="logoImage" alt="tripRecorder" src={logo} />
      </Link>
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={index}>
              <Link exact="true" to={menu.path}>
                <SidebarItem menu={menu} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;

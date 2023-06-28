import React, { useEffect, useState } from "react";
import Logo from "assets/recorder_green.png";
import {
  LogoutOutlined,
  SearchOutlined,
  PlusOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import "style/navbar.scss";
import { useRecoilState } from "recoil";
import {
  userNo,
  userNick,
  userProfile,
  isLoggedIn,
} from "../../recoil/UserInfo";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Alert, Button, Space } from "antd";
import {
  LocalUserNickAtom,
  LocalUserProfileAtom,
} from "recoil/LocalStorageAtom";

const Navbar = () => {
  const [userNum, setUserNum] = useRecoilState(userNo);
  const [userNickName, setUserNickName] = useRecoilState(userNick);
  const [userProf, setUserProf] = useRecoilState(userProfile);
  const [isLog, setIsLog] = useRecoilState(isLoggedIn);
  const [localUserNick, setLocalUserNick] = useRecoilState(LocalUserNickAtom);
  const [localUserProfile, setlocalUserProfile] =
    useRecoilState(LocalUserProfileAtom);

  const location = useLocation();

  const navigate = useNavigate();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  // localstorage 변경에 따라 바뀌는지 확인
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userProfile") {
        setlocalUserProfile(e.newValue);
      }
      if (e.key === "userNick") {
        setLocalUserNick(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // setCloseMenu(closeMenu);
    let user = localStorage.getItem("userNo");
    if (user !== null) {
      setIsLog(true);
    }

    setUserNum(localStorage.getItem("userNo"));
    setUserNickName(localStorage.getItem("userNick"));
    setUserProf(localStorage.getItem("userProfile"));
  }, [window.localStorage.length, localUserNick, localUserProfile]);

  // const logoutAlert = () => {
  //   <Space direction="vertical" style={{ width: "100%" }}>
  //     <Alert
  //       message="로그아웃 하시겠습니까?"
  //       type="success"
  //       showIcon
  //       action={
  //         <Space direction="vertical">
  //           <Button size="small" type="primary">
  //             확인
  //           </Button>
  //           <Button size="small" danger type="ghost">
  //             취소
  //           </Button>
  //         </Space>
  //       }
  //       closable
  //     />
  //   </Space>;
  // };
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
      {isLog ? (
        <div>
          <div
            className={
              closeMenu === false
                ? "profileContainer"
                : "profileContainer active"
            }
          >
            <img
              src={userProf}
              alt="profile"
              className="profile"
              style={{ borderRadius: "50%" }}
            />
            <div
              className="profileContents"
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log(userProf);
                navigate(`/${userNickName}`);
              }}
            >
              <p className="name">{userNickName}</p>
            </div>
          </div>
          <div className="contentsContainer">
            <ul>
              <li className={location.pathname === "/login" ? "active" : ""}>
                <Link to={"/"} className="link_icon">
                  <LogoutOutlined
                    style={{ padding: "0 1rem 0 0.5rem", fontSize: "20px" }}
                  />
                </Link>
                <Link
                  to={"/"}
                  className="link_name"
                  onClick={() => {
                    // console.log("1");
                    Cookies.remove("jwtToken");
                    setIsLog(false);

                    setUserNum("");
                    setUserNickName("");
                    setUserProf("");
                    localStorage.setItem("userNick", "");
                    setLocalUserNick("");
                    localStorage.clear();
                  }}
                >
                  로그아웃
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          className={
            closeMenu === false ? "profileContainer" : "profileContainer active"
          }
        >
          <img src={Logo} alt="profile" className="profile" />
          <div
            className="profileContents"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log(userProf);
              navigate(`/login`);
            }}
          >
            <p className="name">로그인해주세요</p>
            {/* <p>zzahee366@gmail.com</p> */}
          </div>
        </div>
      )}

      <div
        className={
          closeMenu === false ? "contentsContainer" : "contentsContainer active"
        }
      >
        <ul>
          <li className={location.pathname === "/search" ? "active" : ""}>
            <Link to={"/search"} className="link_icon">
              <SearchOutlined
                style={{ padding: "0 1rem 0 0.5rem", fontSize: "20px" }}
              />
            </Link>
            <Link to={"/search"} className="link_name">
              검색
            </Link>
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
            <Link
              to={userNick ? "/login" : "/tripregistration"}
              className="link_name"
            >
              여행등록
            </Link>
          </li>
          <li className={location.pathname === "/popularcard" ? "active" : ""}>
            <Link to={"/popularcard"} className="link_icon">
              <CreditCardOutlined
                style={{ padding: "0 1rem 0 0.5rem", fontSize: "20px" }}
              />
            </Link>
            <Link to={"/popularcard"} className="link_name">
              인기카드
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

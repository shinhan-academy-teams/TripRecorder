import { AppstoreAddOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { imagesState, profileUserNo } from "../../recoil/Profile";
import User from "components/Search/User";
import profileService from "api/profile.service";
import { Link, useNavigate } from "react-router-dom";
import { userProfile, userNo, userNick } from "../../recoil/UserInfo";
const Header = () => {
  const [image, setImageState] = useRecoilState(imagesState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isfollowingOpen, setIsFollowingOpen] = useState(false);
  const [prfUserNo, setPrfUserNo] = useRecoilState(profileUserNo);

  const [userProf, setUserProf] = useRecoilState(userProfile);
  const [userNum, setUserNum] = useRecoilState(userNo);
  const [userNickName, setUserNickName] = useRecoilState(userNick);

  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [progInfo, setProfInfo] = useState();

  useEffect(() => {
    profileService.getFollowingList(userNum).then((res) => {
      setFollowing(res);
      console.log(res);
    });
    profileService.getFollowerList(userNum).then((res) => {
      setFollower(res);
      console.log(res);
    });
    profileService.getProfileInfo(prfUserNo).then((res) => {
      setProfInfo(res);
    });
  }, []);
  const showFolloweModal = () => {
    setIsModalOpen(true);

    // .getFollowerList(localStorage.getItem("userNo"))
  };

  const showFollowingModal = () => {
    setIsFollowingOpen(true);

    // .getFollowerList(localStorage.getItem("userNo"))
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleFollowerCancel = () => {
    setIsModalOpen(false);
  };
  const handleFollowingCancel = () => {
    setIsFollowingOpen(false);
  };

  const error = () => {
    Modal.error({
      title: "팔로우를 못합니다😠",
      content: "로그인 하시고 다시 팔로우 해주세요🤔",
    });
  };

  const navigate = useNavigate();
  return (
    <div id="header">
      <div class="container">
        <div class="profile">
          <div class="profile-image">
            <img src={userProf} alt="" />
          </div>

          <div class="profile-user-settings">
            <h1 class="profile-user-name">{userNickName}</h1>

            {userNum ? (
              <button
                class="btn profile-edit-btn"
                onClick={() => {
                  navigate("detail");
                }}
                style={{
                  // opacity: 0.5,
                  // cursor: "not-allowed",
                  backgroundColor: "#7fb77e",
                  color: "#ffffff",
                }}
              >
                나의 프로필
              </button>
            ) : (
              <button
                class="btn profile-edit-btn"
                onClick={error}
                style={{
                  backgroundColor: "#7fb77e",
                  color: "#ffffff",
                }}
              >
                팔로우
              </button>
            )}

            {/* <button
              class="btn profile-settings-btn"
              aria-label="profile settings"
              onClick={() => {
                navigate(`detail`);
              }}
            >
              <SettingOutlined />
              <i class="fas fa-cog" aria-hidden="true"></i>
            </button> */}
          </div>

          <div class="profile-stats">
            <ul>
              <li
                onClick={() => {
                  // console.log("2");
                  console.log(progInfo);
                }}
              >
                여행티어{" "}
                <span class="profile-stat-count">
                  {progInfo ? progInfo["userLevel"] : "🫅"}
                </span>
              </li>
              <li onClick={showFolloweModal}>
                팔로워{" "}
                <span class="profile-stat-count">
                  {follower ? follower?.length : 0}
                </span>
              </li>
              <li onClick={showFollowingModal}>
                팔로우{" "}
                <span class="profile-stat-count">
                  {following ? following.length : 0}
                </span>
              </li>
            </ul>
          </div>

          <div class="profile-bio">
            <p>
              <span class="profile-real-name">Jane Doe</span> Lorem ipsum dolor
              sit, amet consectetur adipisicing elit 📷✈️🏕️
              <span class="profile-real-name">Apple(실명)</span> 여행을 떠나요
              📷✈️🏕️
            </p>
          </div>
        </div>

        <Modal
          title="팔로워"
          open={isModalOpen}
          onOk={false}
          onCancel={handleFollowerCancel}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          width={400}
          bodyStyle={{
            height: 320,
            overflow: "auto",
            borderTop: "1px solid",
          }}
        >
          <div
            style={{
              overflow: "auto",
            }}
          >
            {follower?.map((val, idx) => {
              return (
                <User
                  key={val?.userNo}
                  src={val?.userProfile}
                  userNick={val?.userNick}
                />
              );
            })}
          </div>
        </Modal>

        <Modal
          title="팔로우"
          open={isfollowingOpen}
          onOk={false}
          onCancel={handleFollowingCancel}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          width={400}
          bodyStyle={{
            height: 320,
            overflow: "auto",
            borderTop: "1px solid",
          }}
        >
          <div
            style={{
              overflow: "auto",
            }}
          >
            {following?.map((val) => {
              return (
                <User
                  key={val?.userNo}
                  src={val?.userProfile}
                  userNick={val?.userNick}
                  userNo={val?.userNo}
                />
              );
            })}
          </div>
        </Modal>
        {/* <AppstoreAddOutlined /> */}
        {/* <!-- End of profile section --> */}
      </div>

      {/* <!-- End of container --> */}
    </div>
  );
};

export default Header;

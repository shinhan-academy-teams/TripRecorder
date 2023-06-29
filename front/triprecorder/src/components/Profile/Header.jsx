import { AppstoreAddOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  imagesState,
  profileUserNo,
  followerModalState,
  followingModalState,
} from "../../recoil/Profile";
import User from "components/Search/User";
import profileService from "api/profile.service";
import { Link, useNavigate } from "react-router-dom";
import { userProfile, userNo, userNick } from "../../recoil/UserInfo";
import styled from "styled-components";
const Header = () => {
  const [image, setImageState] = useRecoilState(imagesState);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(followerModalState);
  // const [isfollowingOpen, setIsFollowingOpen] = useState(false);
  const [isfollowingOpen, setIsFollowingOpen] =
    useRecoilState(followingModalState);
  const [prfUserNo, setPrfUserNo] = useRecoilState(profileUserNo);
  const [userProf, setUserProf] = useRecoilState(userProfile);
  const [userNum, setUserNum] = useRecoilState(userNo);
  const [userNickName, setUserNickName] = useRecoilState(userNick);
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [progInfo, setProfInfo] = useState();
  const [followState, setFollowState] = useState("");
  const [opacity, setOpacity] = useState("1");
  // const [followButton, setFollowButton] = useState(true);

  useEffect(() => {
    profileService.getFollowingList(prfUserNo).then((res) => {
      setFollowing(res);
      console.log(res);
    });
    profileService.getFollowerList(prfUserNo).then((res) => {
      setFollower(res);
      console.log(res);
    });
    profileService.getProfileInfo(prfUserNo).then((res) => {
      setProfInfo(res);
    });
  }, [prfUserNo, follower?.length]);
  useEffect(() => {
    // console.log(follower);
    // if (
    //   follower
    //     ?.map((val, idx) => {
    //       if (val["userNo"] == userNum) return true;
    //     })
    //     .includes(true) == true
    // ) {
    //   setFollowState("팔로잉");
    //   setOpacity("0.5");
    // } else {
    //   setFollowState("팔로우");
    //   setOpacity("1");
    // }
    // profileService.follow(prfUserNo).then((res) => {
    //   console.log(res);
    //   if (res == true) {
    //     setFollowState("팔로잉");
    //     setOpacity("0.5");
    //   } else {
    // setFollowState("팔로우");
    // setOpacity("1");
    //   }
    // });
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
      title: "팔로우를 못합니다:화난:",
      content: "로그인 하시고 다시 팔로우 해주세요:생각하는_얼굴:",
    });
  };
  const navigate = useNavigate();
  return (
    <div id="header">
      <div class="container">
        <div class="profile">
          <div class="profile-image">
            <img
              src={progInfo ? progInfo["profilePhoto"] : ""}
              alt="profile"
              style={{ maxWidth: "266px", maxHeight: "266px" }}
            />
          </div>
          <div class="profile-user-settings">
            <h1 class="profile-user-name">
              {progInfo ? progInfo["userNick"] : "nick"}
            </h1>
            {/* <button
              class="btn profile-edit-btn"
              onClick={() => {
                console.log(userNum, prfUserNo);
                console.log(
                  follower
                    ?.map((val, idx) => {
                      if (val["userNo"] == userNum) return true;
                    })
                    .includes(true) == true && userNum != null
                );
                console.log(prfUserNo, "prfUserNo");
                console.log(prfUserNo, "prfUserNo");
              }}
              style={{
                backgroundColor: "#7FB77E",
                color: "#FFFFFF",
              }}
            >
              Test
            </button> */}
            {userNum == prfUserNo ? (
              <button
                class="btn profile-edit-btn"
                onClick={() => {
                  navigate(`/${userNickName}/${userNum}/detail`);
                }}
                style={{
                  // opacity: 0.5,
                  // cursor: "not-allowed",
                  backgroundColor: "#7FB77E",
                  color: "#FFFFFF",
                }}
              >
                프로필 수정
              </button>
            ) : follower
                ?.map((val, idx) => {
                  if (val["userNo"] == userNum) return true;
                })
                .includes(true) == true && userNum != null ? (
              // 팔로우시 return true
              <button
                class="btn profile-edit-btn"
                onClick={async () => {
                  console.log(userNum);
                  console.log(
                    follower
                      ?.map((val, idx) => {
                        if (val["userNo"] == userNum) return true;
                      })
                      .includes(true)
                  );
                  // console.log(following, "following");
                  await console.log(follower?.length, "follower-length");

                  await profileService.follow(prfUserNo);
                  profileService.getFollowerList(prfUserNo).then((res) => {
                    setFollower(res);
                    console.log(res);
                  });
                  await console.log(follower?.length, "follower");
                }}
                style={{
                  backgroundColor: "#7FB77E",
                  color: "#FFFFFF",
                  opacity: 0.5,
                }}
              >
                {/* {followState} */}
                팔로잉
              </button>
            ) : userNum ? (
              <button
                class="btn profile-edit-btn"
                onClick={() => {
                  profileService.follow(prfUserNo).then((res) => {
                    console.log(res);
                  });
                  profileService.getFollowerList(prfUserNo).then((res) => {
                    setFollower(res);
                    console.log(res);
                  });
                }}
                style={{
                  backgroundColor: "#7FB77E",
                  color: "#FFFFFF",
                }}
              >
                팔로우
              </button>
            ) : (
              <button
                class="btn profile-edit-btn"
                onClick={error}
                style={{
                  backgroundColor: "#7FB77E",
                  color: "#FFFFFF",
                }}
              >
                팔로우(Notuser)
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
                  {progInfo ? progInfo["userLevel"] : ":왕관을_쓴_사람:"}
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
              <span class="profile-real-name">
                {progInfo ? progInfo["profileMsg"] : ":카메라::비행기::야영:"}
              </span>
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

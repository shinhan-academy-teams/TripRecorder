import React, { useEffect, useState } from "react";
import "../style/profile.scss";
import styles from "../style/profile2.module.scss";
import Header from "components/Profile/Header";
import GalleryItem from "components/Profile/GalleryItem";
import profileService from "api/profile.service";
import { Button, Modal, Tabs, message } from "antd";
import CategoryItem from "components/Profile/CategoryItem";
import Expense from "components/Profile/Expense";
import { useRecoilState } from "recoil";
import { imagesState } from "../recoil/Profile";
import { userNo, userNick, userProfile } from "../recoil/UserInfo";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  RollbackOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { profileUserNo } from "../recoil/Profile";
import CategoryExpenseItem from "components/Profile/CategoryExpenseItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "api/axios";
const { confirm } = Modal;

const Profile = () => {
  const [image, setImageState] = useRecoilState(imagesState);
  const [prfUserNo, setPrfUserNo] = useRecoilState(profileUserNo);
  const [loading, setLoading] = useState(true);
  const [tripNo, setTripNo] = useState();
  const loginUserNo = localStorage.getItem("userNo");

  // const getProfile = () => {
  //   profileService
  //     .getSnsPostList(localStorage.getItem("userNo"))
  //     .then((res) => console.log(res));
  // };
  const [userNum, setUserNum] = useRecoilState(userNo);
  const navigate = useNavigate();
  let { userNick } = useParams();
  useEffect(() => {
    // profileService.getSnsPostList(4).then((res) => {
    //   setImages(res);
    //   console.log("hi");
    //   console.log(images);
    // });

    console.log(userNick, "##");

    profileService.getUserNo(userNick).then((res) => {
      // console.log(userNick, "@@@@@@@@@@@@@");
      setPrfUserNo(res);
    });

    profileService.getCategoryList(prfUserNo).then((res) => {
      // profileUserNo
      console.log(res);
      // setImages(res);
      setImageState(res);
      setLoading(false);
    });
  }, [prfUserNo, userNick]);

  // 여행 카테고리 들어가면 tripNo 변경
  const updateTripNo = (newNo) => {
    setTripNo(newNo);
  };
  // 여행 카테고리 삭제
  const deleteCategory = () => {
    console.log(tripNo);
    confirm({
      title: "여행 카테고리 삭제",
      icon: <ExclamationCircleFilled />,
      content: "정말 카테고리를 삭제하시겠습니까?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        api
          .delete("/trip/delete/" + tripNo)
          .then((res) => {
            message.success("여행 카테고리를 삭제했습니다!");
            navigate("/");
          })
          .catch((err) => message.error("여행 카테고리 삭제에 실패했습니다."));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const num = loginUserNo ? 2 : 1;

  return (
    // <div className={styles.divbox}>
    <div className={styles.divbox} style={{ fontSize: "10px" }}>
      <Header />
      <div id="main">
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            centered
            items={new Array(num).fill(null).map((_, i) => {
              const id = String(i + 1);
              const label = ["게시물", "경비"];
              return {
                label: `${label[i]}`,
                key: id,
                children:
                  label[i] === "게시물" ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flexDirection: "row",
                          padding: "20px",
                        }}
                      >
                        {image[0]?.tripName ? (
                          prfUserNo == loginUserNo ? (
                            <Link to={"/tripregistration"}>
                              <button
                                className="btn profile-settings-btn"
                                onClick={() => {
                                  // navigate("/tripregistration", {
                                  //   state: {
                                  //     id: 1,
                                  //     job: "개발자",
                                  //   },
                                  // });
                                  console.log(image, "category");
                                }}
                              >
                                <AppstoreAddOutlined />
                              </button>
                            </Link>
                          ) : (
                            <></>
                          )
                        ) : prfUserNo == loginUserNo ? (
                          <Link to={"/registersns"}>
                            <button
                              className="btn profile-settings-btn"
                              onClick={() => {
                                console.log(image, "profile");
                              }}
                            >
                              <AppstoreAddOutlined />
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        <button
                          className="btn profile-settings-btn"
                          onClick={() => {
                            setImageState([]);
                            setLoading(true);
                            profileService
                              .getCategoryList(prfUserNo)
                              .then((res) => {
                                console.log(res);
                                // setImages(res);
                                setImageState(res);
                                setLoading(false);
                              });
                          }}
                        >
                          <RollbackOutlined />
                        </button>
                        {image[0]?.tripName ? (
                          <></>
                        ) : prfUserNo == loginUserNo ? (
                          <button
                            onClick={deleteCategory}
                            className="btn profile-settings-btn"
                          >
                            <DeleteOutlined />
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                      {/* {loading ? <div className="loader" /> : ""} */}

                      <div className="gallery">
                        {image?.map((imageItem, index) =>
                          imageItem.tripName ? (
                            <CategoryItem
                              key={index}
                              src={imageItem.thumbnail}
                              tripName={imageItem.tripName}
                              tripNo={imageItem.tripNo}
                              updateTripNo={updateTripNo}
                            />
                          ) : (
                            <GalleryItem
                              key={index}
                              src={imageItem.thumbnail}
                              likes={imageItem.heartCnt}
                              comments={imageItem.replyCnt}
                              snsNo={imageItem.snsNo}
                            />
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 비용쪽 카테*/}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flexDirection: "row",
                          padding: "20px",
                        }}
                      >
                        {image[0]?.tripName ? (
                          prfUserNo == loginUserNo ? (
                            <Link to={"/tripregistration"}>
                              <button
                                className="btn profile-settings-btn"
                                onClick={() => {
                                  // navigate("/tripregistration", {
                                  //   state: {
                                  //     id: 1,
                                  //     job: "개발자",
                                  //   },
                                  // });
                                  console.log(image, "category");
                                }}
                              >
                                <AppstoreAddOutlined />
                              </button>
                            </Link>
                          ) : (
                            <></>
                          )
                        ) : prfUserNo == loginUserNo ? (
                          <Link to={"/registerexp"}>
                            <button
                              className="btn profile-settings-btn"
                              onClick={() => {
                                console.log(image, "profile");
                              }}
                            >
                              <AppstoreAddOutlined />
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        <button
                          className="btn profile-settings-btn"
                          onClick={() => {
                            setImageState([]);
                            setLoading(true);
                            profileService
                              .getCategoryList(prfUserNo)
                              .then((res) => {
                                console.log(res);
                                // setImages(res);
                                setImageState(res);
                                setLoading(false);
                              });
                          }}
                        >
                          <RollbackOutlined />
                        </button>
                        {image[0]?.tripName ? (
                          <></>
                        ) : prfUserNo == loginUserNo ? (
                          <button
                            onClick={deleteCategory}
                            className="btn profile-settings-btn"
                          >
                            <DeleteOutlined />
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                      {loading ? <div className="loader" /> : ""}
                      <div className="gallery">
                        {image?.map((imageItem, index) =>
                          imageItem.tripName ? (
                            <CategoryExpenseItem
                              key={index}
                              src={imageItem.thumbnail}
                              tripName={imageItem.tripName}
                              tripNo={imageItem.tripNo}
                            />
                          ) : (
                            ""
                          )
                        )}
                        {image[0]?.tripName ? "" : <Expense />}
                      </div>
                    </>
                  ),
              };
            })}
          />

          {/* <!-- End of gallery --> */}

          {/* <div class="loader"></div> */}
        </div>
        {/* <!-- End of container --> */}
      </div>
    </div>
  );
};

export default Profile;

// items={new Array(2).fill(null).map((_, i) => {
//   const id = String(i + 1);
//   const label = ["게시물", "경비"];
//   return {
//     label: `${label[i]}`,
//     key: id,
//     children:
//       label[i] === "게시물" ? (
//         <div class="gallery">
//           {images?.map((image, index) => (
//             <GalleryItem
// key={index}
// src={image.thumbnail}
// likes={image.heartCnt}
// comments={image.replyCnt}
//             />
//           ))}
//         </div>
//       ) : (
//         "hi"
//       ),
//   };
// })}

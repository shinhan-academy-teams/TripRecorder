import React, { useEffect, useState } from "react";
import "../style/profile.scss";
import styles from "../style/profile2.module.scss";
import Header from "components/Profile/Header";
import GalleryItem from "components/Profile/GalleryItem";
import profileService from "api/profile.service";
import { Button, Tabs } from "antd";
import CategoryItem from "components/Profile/CategoryItem";
import Expense from "components/Profile/Expense";
import { useRecoilState } from "recoil";
import { imagesState } from "../recoil/Profile";
import { userNo, userNick, userProfile } from "../recoil/UserInfo";
import {
  AppstoreAddOutlined,
  RollbackOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { profileUserNo } from "../recoil/Profile";
import CategoryExpenseItem from "components/Profile/CategoryExpenseItem";
import { Link, useParams } from "react-router-dom";
const Profile = () => {
  const [image, setImageState] = useRecoilState(imagesState);
  const [prfUserNo, setPrfUserNo] = useRecoilState(profileUserNo);
  const [loading, setLoading] = useState(true);

  // const getProfile = () => {
  //   profileService
  //     .getSnsPostList(localStorage.getItem("userNo"))
  //     .then((res) => console.log(res));
  // };
  const [userNum, setUserNum] = useRecoilState(userNo);
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

    profileService.getCategoryList(userNum).then((res) => {
      // profileUserNo
      console.log(res);
      // setImages(res);
      setImageState(res);
      setLoading(false);
    });
  }, []);

  return (
    // <div className={styles.divbox}>
    <div className={styles.divbox} style={{ fontSize: "10px" }}>
      <Header />
      <div id="main">
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            centered
            items={new Array(2).fill(null).map((_, i) => {
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
                        )}
                        <button
                          className="btn profile-settings-btn"
                          onClick={() => {
                            setImageState([]);
                            setLoading(true);
                            profileService
                              .getCategoryList(userNum)
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
                        )}
                        <button
                          className="btn profile-settings-btn"
                          onClick={() => {
                            setImageState([]);
                            setLoading(true);
                            profileService
                              .getCategoryList(userNum)
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

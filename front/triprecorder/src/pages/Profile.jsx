import React, { useEffect, useState } from "react";
import "../style/profile.scss";
import styles from "../style/profile2.module.scss";
import Header from "components/Profile/Header";
import GalleryItem from "components/Profile/GalleryItem";
import profileService from "api/profile.service";
import { Tabs } from "antd";
import CategoryItem from "components/Profile/CategoryItem";
import Expense from "components/Profile/Expense";
import { useRecoilState } from "recoil";
import { imagesState } from "../recoil/Profile";
const Profile = () => {
  const [image, setImageState] = useRecoilState(imagesState);
  const [loading, setLoading] = useState(true);

  // const getProfile = () => {
  //   profileService
  //     .getSnsPostList(localStorage.getItem("userNo"))
  //     .then((res) => console.log(res));
  // };

  useEffect(() => {
    // profileService.getSnsPostList(4).then((res) => {
    //   setImages(res);
    //   console.log("hi");
    //   console.log(images);
    // });

    profileService
      .getCategoryList(localStorage.getItem("userNo"))
      .then((res) => {
        console.log(res);
        // setImages(res);
        setImageState(res);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.divbox}>
      <Header />
      <div id="main">
        <div class="container">
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
                    <div class="gallery">
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
                          />
                        )
                      )}
                    </div>
                  ) : (
                    <Expense />
                  ),
              };
            })}
          />
          {loading ? <div class="loader" /> : ""}


          {/* <!-- End of gallery --> */}

          {/* <div class="loader"></div> */}
        </div>
        {/* <!-- End of container --> */}
      </div>
    </div>
  );
};

export default Profile;

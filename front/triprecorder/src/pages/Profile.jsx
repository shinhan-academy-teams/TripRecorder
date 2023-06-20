import React, { useEffect, useState } from "react";
import "../style/profile.scss";
import styles from "../style/profile2.module.scss";
import Header from "components/Profile/Header";
import { HeartFilled, MessageFilled } from "@ant-design/icons";
import GalleryItem from "components/Profile/GalleryItem";
import { Button } from "antd";
import profileService from "api/profile.service";

const Profile = () => {
  // let images = [
  //   {
  //     src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop",
  //     likes: 42,
  //     comments: 1,
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
  //     likes: 38,
  //     comments: 0,
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
  //     likes: 38,
  //     comments: 0,
  //   },
  //   {
  //     src: "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
  //     likes: 38,
  //     comments: 0,
  //   },
  // ];

  const [images, setImages] = useState();

  const getProfile = () => {
    profileService
      .getProfileInfo(localStorage.getItem("userNo"))
      .then((res) => console.log(res));
  };

  useEffect(() => {
    profileService.getProfileInfo(4).then((res) => {
      setImages(res);
      console.log("hi");
      console.log(images);
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div id="main">
        <div class="container">
          <div class="gallery">
            {images?.map((image, index) => (
              <GalleryItem
                key={index}
                src={image.thumbnail}
                likes={image.heartCnt}
                comments={image.replyCnt}
              />
            ))}
          </div>
          {/* <!-- End of gallery --> */}

          {/* <div class="loader"></div> */}
        </div>
        {/* <!-- End of container --> */}
      </div>
    </div>
  );
};

export default Profile;

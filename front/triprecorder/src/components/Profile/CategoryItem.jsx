import { AppstoreOutlined } from "@ant-design/icons";
import React from "react";
// import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { imagesState, tripNoState } from "../../recoil/Profile";
import profileService from "api/profile.service";

const CategoryItem = ({ src, tripName, tripNo, updateTripNo }) => {
  const [image, setImageState] = useRecoilState(imagesState);
  const [tno, setTno] = useRecoilState(tripNoState);
  //   const getProfile = (e) => {
  //     profileService.getSnsPostList(e).then((res) => console.log(res));
  //   };
  return (
    // max-width: 100%;
    // height: auto;

    <div>
      <div
        class="gallery-item"
        tabindex="0"
        style={{ maxWidth: "352px", height: "342px" }}
      >
        <img
          onClick={() => alert("2")}
          src={src}
          class="gallery-image"
          alt=""
        />
        <div
          class="gallery-item-info"
          onClick={() => {
            setTno(tripNo);
            profileService.getSnsPostList(tripNo).then((res) => {
              setImageState(res);
              console.log(res);
            });
            console.log(image);
            updateTripNo(tripNo);
            // GalleryItem
          }}
        >
          <ul>
            <li class="gallery-item-likes">
              <span>
                <AppstoreOutlined />
              </span>
              <i class="fas fa-heart" aria-hidden="true"></i> {tripName}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;

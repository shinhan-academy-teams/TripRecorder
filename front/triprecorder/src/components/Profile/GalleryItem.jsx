import { HeartFilled, MessageFilled } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const GalleryItem = ({ src, likes, comments, snsNo }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/sns/detail/" + snsNo);
      }}
    >
      <div
        class="gallery-item"
        tabindex="0"
        style={{ maxWidth: "352px", height: "auto" }}
      >
        <img src={src} class="gallery-image" alt="" />

        <div class="gallery-item-info">
          <ul>
            <li class="gallery-item-likes">
              <span>
                <HeartFilled />
              </span>
              <i class="fas fa-heart" aria-hidden="true"></i> {likes}
            </li>
            <li class="gallery-item-comments">
              <span>
                <MessageFilled />
              </span>
              <i class="fas fa-comment" aria-hidden="true"></i> {comments}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;

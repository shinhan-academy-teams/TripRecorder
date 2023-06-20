import { HeartFilled, MessageFilled } from "@ant-design/icons";
import React from "react";

const GalleryItem = ({ src, likes, comments }) => {
  return (
    <div>
      <div class="gallery-item" tabindex="0">
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
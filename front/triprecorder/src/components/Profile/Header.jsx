import React from "react";

const Header = () => {
  return (
    <div id="header">
      <div class="container">
        <div class="profile">
          <div class="profile-image">
            <img
              src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
              alt=""
            />
          </div>

          <div class="profile-user-settings">
            <h1 class="profile-user-name">janedoe_</h1>

            <button class="btn profile-edit-btn">팔로우</button>

            <button
              class="btn profile-settings-btn"
              aria-label="profile settings"
            >
              <i class="fas fa-cog" aria-hidden="true"></i>
            </button>
          </div>

          <div class="profile-stats">
            <ul>
              <li>
                여행티어 <span class="profile-stat-count">🫅</span>
              </li>
              <li>
                팔로워 <span class="profile-stat-count">188</span>
              </li>
              <li>
                팔로우 <span class="profile-stat-count">206</span>
              </li>
            </ul>
          </div>

          <div class="profile-bio">
            <p>
              <span class="profile-real-name">Jane Doe</span> Lorem ipsum dolor
              sit, amet consectetur adipisicing elit 📷✈️🏕️
            </p>
          </div>
        </div>
        {/* <!-- End of profile section --> */}
      </div>
      {/* <!-- End of container --> */}
    </div>
  );
};

export default Header;

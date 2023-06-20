import React from "react";

const Header = () => {
  return (
    <div id="header">
      <div class="container">
        <div class="profile">
          <div class="profile-image">
            <img src={`${localStorage.getItem("userProfile")}`} alt="" />
          </div>

          <div class="profile-user-settings">
            <h1 class="profile-user-name">
              {localStorage.getItem("userNick")}
            </h1>

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

              <span class="profile-real-name">Apple(실명)</span> 여행을 떠나요
              📷✈️🏕️

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

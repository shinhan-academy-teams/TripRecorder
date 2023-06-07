import React from "react";

function SidebarItem({ menu }) {
  return (
    <div className="sidebar-item">
      <p>
        {menu.icon} {menu.name}
      </p>
    </div>
  );
}

export default SidebarItem;

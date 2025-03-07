import React from "react";
import "/src/assets/css/adminDashboard.css"; // Import CSS file

const Menu_Header = () => {
  return (
    <div className="admin-header ">
        <h1>HomeAdmin</h1>
        <div className="search-container">
            {/* <input type="text" placeholder="Search..." className="search-input" /> */}
        </div>

        {/* Chọn ngôn ngữ & Avatar */}
        <div className="admin-header-right">
        <span className="language-selector">🇺🇸</span>
        <div className="admin-avatar">
            <img src="/src/assets/images/avatar.png"  />
        </div>
        </div>
    </div>

  );
}

export default Menu_Header;
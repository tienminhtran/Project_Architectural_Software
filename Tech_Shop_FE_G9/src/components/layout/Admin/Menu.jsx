import React, { useState } from "react";
import { FaTachometerAlt, FaTags, FaUsers, FaGift, FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "/src/assets/css/adminMenu.css"; // Import CSS file
import { Link } from "react-router-dom";

const Menu = () => {
  // State để kiểm soát menu con
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/public/images/logo/logo-large.png" alt="Site Logo" />
      </div>

      <div className="menuss">
        <ul className="menu">
            <li className="menu-item">
              <FaTachometerAlt /> <Link to="/admin/dashboard">Dashboard </Link>
            </li>
            <li className={`menu-item ${openMenus.brand ? "open" : ""}`} onClick={() => toggleMenu("brand")}>
            <FaTags /> Brand <IoIosArrowForward className="arrow" />
            <ul className="submenu">
                <li><Link to="/common/BrandPage">Manage Brands</Link></li>
                <li>Add Brand</li>
            </ul>
            </li>

            <li className={`menu-item ${openMenus.category ? "open" : ""}`} onClick={() => toggleMenu("category")}>
            <FaTags /> Category <IoIosArrowForward className="arrow" />
            <ul className="submenu">
                <li>Add Category</li>
                <li>Manage Categories</li>
            </ul>
            </li>

            <li className={`menu-item ${openMenus.user ? "open" : ""}`} onClick={() => toggleMenu("user")}>
            <FaUsers /> User <IoIosArrowForward className="arrow" />
            <ul className="submenu">
                <li>User List</li>
                <li>Roles & Permissions</li>
            </ul>
            </li>

            <li className={`menu-item ${openMenus.voucher ? "open" : ""}`} onClick={() => toggleMenu("voucher")}>
            <FaGift /> Voucher <IoIosArrowForward className="arrow" />
            <ul className="submenu">
                <li>Create Voucher</li>
                <li>Manage Vouchers</li>
            </ul>
            </li>

            <li className="menu-item">
            <FaHome /> User Home
            </li>

            <li className="menu-item">
            <FaHome /> Manager Home
            </li>
        </ul>
      </div>

    </div>
  );
};

export default Menu;

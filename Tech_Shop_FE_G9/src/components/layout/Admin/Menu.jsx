import React, { useState } from "react";
import { FaTachometerAlt, FaTags, FaUsers, FaGift, FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "/src/assets/css/adminMenu.css"; // Import CSS file
import "/src/assets/css/SubClass.css"; // Import CSS file
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
        <img src="/images/logo/logo-large.png" alt="Site Logo" />
      </div>

      <div className="menuss">
        <ul className="menu">
            <li className="menu-item">
              <FaTachometerAlt /> <Link to="/admin/dashboard">Dashboard </Link>
            </li>
            <li className={`menu-item ${openMenus.brand ? "open" : ""}`} onClick={() => toggleMenu("brand")}>
            <FaTags /> Brand <IoIosArrowForward className="arrow" />
            <ul className="submenu">
                <li><Link to="/common/BrandPage">List Brands</Link></li>
                <li><Link to="/common/AddBrandPage">Add Brand</Link></li>
            </ul>
            </li>

            <li className={`menu-item ${openMenus.category ? "open" : ""}`} onClick={() => toggleMenu("category")}>
            <FaTags /> Category <IoIosArrowForward className="arrow" />
            <ul className="submenu">
                <li><Link to="/common/CategoryPage">List Category</Link></li>
                <li><Link to="/common/AddCategoryPage">Add Category</Link></li>
                {/* <li>Add Category</li> */}
                {/* <li>Manage Categories</li> */}
            </ul>
            </li>

            <li className={`menu-item ${openMenus.user ? "open" : ""}`} onClick={() => toggleMenu("user")}>
            <FaUsers /> User <IoIosArrowForward className="arrow" />
            <ul className="submenu">
                <li><Link to="/common/UserPage">List Users</Link></li>
                <li><Link to="/common/AddUserPage">Add User</Link></li>
            </ul>
            </li>

            <li className={`menu-item ${openMenus.voucher ? "open" : ""}`} onClick={() => toggleMenu("voucher")}>
            <FaGift /> Voucher <IoIosArrowForward className="arrow" />
            <ul className="submenu">
                <li><Link to="/common/formVoucher">Create Voucher</Link></li>
                <li><Link to="/common/vouchers">Manage Vouchers</Link></li>
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

import React, { useEffect, useState, useRef } from "react";
import {
  FaBars,
  FaChevronDown,
  FaShoppingCart,
  FaUser,
  FaHeart,
} from "react-icons/fa";
import "../../../src/assets/css/HeaderUserBasic.css";
import AnnouncementBar from "./AnnouncementBar.jsx";
import useUser from "../../hooks/useUser.js";
import { useNavigate } from "react-router-dom";

const HeaderUserBasic = () => {
  const navigate = useNavigate();
  const { userInfor } = useUser(0, 1);

  const userMenuRef = useRef();
  const categoryMenuRef = useRef();

  const [showMenu, setShowMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const toggleUserMenu = () => setShowMenu((prev) => !prev);
  const toggleCategoryMenu = () => setShowCategories((prev) => !prev);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header-user">
      {/* Announcement Bar */}
      <AnnouncementBar />

      <div className="container-fluid py-3">
        {/* Top Header */}
        <div className="row align-items-center">
          <button className="col-3 text-center text-md-start bg-white" onClick={() => navigate('/')}>
            <img
              src="/images/logo/logo-large.png"
              alt="TechMart Logo"
              className="img-fluid"
              style={{ maxHeight: "50px" }}
            />
          </button>

          <div className="col-7">
            <form className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm..."
              />
            </form>
          </div>

          <div className="col-2 text-end">
            <div className="d-flex justify-content-end gap-2">
              <select className="form-select w-auto">
                <option value="USD">USD</option>
                <option value="VND">VND</option>
                <option value="EUR">EUR</option>
              </select>
              <select className="form-select w-auto">
                <option value="EN">EN</option>
                <option value="VN">VN</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="row align-items-center mt-3">
          {/* Categories */}
          <div className="col-3 text-center text-md-start" ref={categoryMenuRef}>
            <div
              className="header-user-basic__category-header"
              onClick={toggleCategoryMenu}
            >
              <FaBars className="header-user-basic__menu-icon" />
              Categories
            </div>

            {showCategories && (
              <ul className="header-user-basic__category-list">
                <li
                  className="header-user-basic__category-item"
                  onClick={() => navigate("/categories-all-laptop")}
                >
                  Laptop <FaChevronDown className="header-user-basic__chevron-icon" />
                </li>
                <li
                  className="header-user-basic__category-item"
                  onClick={() => navigate("/categories-all-phone")}
                >
                  Phone <FaChevronDown className="header-user-basic__chevron-icon" />
                </li>
                <li
                  className="header-user-basic__category-item"
                  onClick={() => navigate("/categories-all-accessory")}
                >
                  Accessory{" "}
                  <FaChevronDown className="header-user-basic__chevron-icon" />
                </li>
              </ul>
            )}
          </div>

          {/* Menu Items */}
          <div className="col-7">
            <ul className="header-user-basic__menu">
              <li>
                <a className="active" onClick={() => navigate('/')}>
                  Home
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/user")}>Shop</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>

          {/* Icons */}
          <div className="col-2 text-end">
            <div className="header-user-basic__menu-icons">
              <div className="header-user-basic__icon-item">
                <FaShoppingCart style={{ color: "#838383" }} />
                <span className="header-user-basic__icon-badge-cart">2</span>
              </div>
              <div className="header-user-basic__icon-item">
                <FaHeart style={{ color: "#838383" }} />
                <span className="header-user-basic__icon-badge-heart">12</span>
              </div>
              <div
                className="header-user-basic__icon-item"
                onClick={toggleUserMenu}
                ref={userMenuRef}
              >
                <FaUser />
                <span className="header-user-basic__username">
                  {userInfor?.firstname || "User"}
                </span>
                {showMenu && (
                  <div className="header-user-basic__dropdown">
                    <div
                      className="header-user-basic__dropdown-item"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </div>
                    <div
                      className="header-user-basic__dropdown-item"
                      onClick={() => navigate("/")}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderUserBasic;

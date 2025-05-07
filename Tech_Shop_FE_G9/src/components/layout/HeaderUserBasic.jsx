import React, { useEffect, useState, useRef, useMemo } from "react";
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
import { useDispatch } from "react-redux";
import { getAccessToken, removeAccessToken } from "../../services/authService.js";
import { logout } from "../../store/slices/AuthSlice.js";
import { confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";
import useCart from "../../hooks/useCart.js";

const HeaderUserBasic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfor } = useUser(0, 1);
    const user = useMemo(() => {
      return userInfor|| null;
    }, [userInfor]);

    const {carts} = useCart();
    const cartItems = useMemo(() => {
      if(!carts) return [];
      return carts.response;
    }, [carts]);

    const token = getAccessToken();
    

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

  const handleLogout = () => {
    confirmAlert({
      message: 'Bạn có chắc chắn muốn đăng xuất không?',
      buttons: [
        {
          label: 'Tiếp tục',
          onClick: () => {
            dispatch(logout());
            removeAccessToken();
            localStorage.removeItem("lastDashboard");
            navigate("/");
            window.location.reload();
            toast.success("Đăng xuất thành công", {
              position: 'top-right',
              autoClose: 2000,              
            })
          }
        }, 
        {
          label: 'Hủy bỏ',
          onClick: () => {}
        }
      ]
    })
  }

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
        <div className="row align-items-center mt-3 bg-light">
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
              <li><a  onClick={() => navigate('/')}> Home</a></li>
              <li><a  onClick={() => navigate('/shop')}>Shop</a></li>
              <li><a onClick={() => navigate('/pages')}>Pages</a></li>
              <li><a onClick={() => navigate('/abouts')}>About</a></li>
              <li><a  onClick={()=> navigate('/blogs/all')}>Blog</a></li>
              <li><a onClick={() => navigate('/contacts')}>Contact</a></li>
            </ul>
          </div>

          {/* Icons */}
          <div className="col-2 text-end">
            <div className="header-user-basic__menu-icons">
              <div className="header-user-basic__icon-item">
                <FaShoppingCart style={{ color: "#838383" }} onClick={()=>navigate('/cart')}/>
                <span className="header-user-basic__icon-badge-cart">{cartItems.length}</span>
              </div>
              <div className="header-user-basic__icon-item">
                <FaHeart style={{ color: "#838383" }} onClick={()=>navigate('/favorite-products')}/>
                <span className="header-user-basic__icon-badge-heart">12</span>
              </div>
              <div
                className="header-user-basic__icon-item"
                onClick={toggleUserMenu}
                ref={userMenuRef}
              >
                <FaUser />
                <span className="header-user-basic__username">
                  {user?.firstname || "User"}
                </span>
                {showMenu && (
                  <div className="header-user__dropdown">
                    {!token ? (

                      <div className="p-3" >
                        <p className="">Xin chào, vui lòng đăng nhập</p>
                        <button className="btn btn-primary rounder-3"  onClick={() => navigate('/login')}> 
                          Login
                        </button>
                        <div className="d-flex justify-content-center align-items-center mt-2 gap-2" style={{ width: '100%' }}>
                          <span className="text-muted"style={{fontSize: '12px'}}>No account yet?</span>
                          <button className="btn btn-danger w-50" onClick={() => navigate('/register')}>Register</button>
                        </div>
                      </div>

                    ) : (
                      <div>
                        <div className="header-user__dropdown-item" onClick={() => navigate('/my-account')} >My Account</div>
                        
                        {userInfor.role.code === "ADMIN" && (
                            <div className="header-user__dropdown-item" onClick={() => navigate('/admin/dashboard')} >Admin</div>
                        )}

                        {(userInfor.role.code === "ADMIN" || userInfor.role.code === "MANAGER") && (
                          <div className="header-user__dropdown-item" onClick={() => navigate('/manager/dashboard')} >Manager</div>
                        )}

                        <div className="header-user__dropdown-item" onClick={handleLogout} >Logout</div>
                      </div>
                    )}
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

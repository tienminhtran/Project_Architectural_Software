// Nhập các thư viện và hook cần thiết
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  FaBars,
  FaChevronDown,
  FaShoppingCart,
  FaUser,
  FaHeart,
} from "react-icons/fa";
import "../../../src/assets/css/HeaderUser.css";
import AnnouncementBar from "./AnnouncementBar.jsx";
import useDashboardData from "../../hooks/useDashboardData ";
import useUser from "../../hooks/useUser.js";
import SaleTopPrice from "./Saletopprice.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAccessToken,
  removeAccessToken,
} from "../../services/authService.js";
import { logout } from "../../store/slices/AuthSlice.js";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import useCart from "../../hooks/useCart.js";
import useWishlist from "../../hooks/useWishlist.js";
import useCategorie from "../../hooks/useCategorie.js";

const HeaderUser = ({showCategory, showBanner}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carts } = useCart();
  const { wishlists } = useWishlist();
  const wishlistItems = useMemo(() => {
    if (!wishlists) return [];
    return wishlists.response;
  }, [wishlists]);
  const cartItems = useMemo(() => {
    if (!carts) return [];
    return carts.response;
  }, [carts]);

  const { userInfor } = useUser();
  const user = useMemo(() => {
    return userInfor || null;
  }, [userInfor]);

  const token = getAccessToken();

  const { getCategories_NoPaging } = useCategorie();

  const { recentlyProduct } = useDashboardData();

  const [showCategories, setShowCategories] = useState(showCategory);
  

  const userMenuRef = useRef();

  // Banner xử lý từ sản phẩm gần đây
  const banners =
    Array.isArray(recentlyProduct) && recentlyProduct.length > 0
      ? recentlyProduct.slice(0, 3).map((product, index) => ({
          category: product.categoryName || "Unknown",
          icon: ["💻", "📱", "🎧"][index % 3],
          title: `${product.productName}\n${
            product.description?.substring(0, 30) || "Special Offer"
          }`,
          img: product.thumbnail?.startsWith("https://")
            ? product.thumbnail
            : `/images/product/${product.thumbnail?.replace(
                /^[^_]+_[^_]+_/,
                ""
              )}`,
        }))
      : [];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    confirmAlert({
      message: "Bạn có chắc chắn muốn đăng xuất không?",
      buttons: [
        {
          label: "Tiếp tục",
          onClick: () => {
            dispatch(logout());
            removeAccessToken();
            localStorage.removeItem("lastDashboard");
            navigate("/");
            window.location.reload();
            toast.success("Đăng xuất thành công", {
              position: "top-right",
              autoClose: 2000,
            });
          },
        },
        {
          label: "Hủy bỏ",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
      <div className="header-user">
        {/* Thanh thông báo đầu trang */}
        <AnnouncementBar />
        <div className="container-fluid py-3">
          {/* Header trên cùng */}
          <div className="row align-items-center">
            {/* Logo */}
            <button
              className="col-3 text-center text-md-start bg-white"
              onClick={() => navigate("/")}
            >
              <img
                src="/images/logo/logo-large.png"
                alt="TechMart Logo"
                className="img-fluid"
                style={{ maxHeight: "50px" }}
              />
            </button>
            {/* Ô tìm kiếm */}
            <div className="col-7">
              <form className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm..."
                />
              </form>
            </div>
            {/* Ngôn ngữ & tiền tệ */}
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

          {/* Menu điều hướng & danh mục */}
          <div className="row align-items-center mt-3 bg-light">
            <div className="col-3 text-center text-md-start" style={{padding: "0"}}>
              <div className="header-user__category-header" onClick={() => setShowCategories(!showCategories)}>
                <FaBars className="header-user__menu-icon" />
                Category
              </div>
            </div>
            <div className="col-7">
              <ul className="header-user__menu">
                <li>
                  <a onClick={() => navigate("/")} className="active">
                    Home
                  </a>
                </li>
                <li>
                <a onClick={() => navigate("/shop")}>Shop</a>
                </li>
                <li>
                  <a onClick={() => navigate("/pages")}>Pages</a>
                </li>
                <li>
                  <a onClick={() => navigate("/recruitment")}>Recruitment</a>
                </li>
                <li>
                  <a onClick={() => navigate("/blogs/all")}>Blog</a>
                </li>
                <li>
                  <a onClick={() => navigate("/contact")}>Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-2 text-end">
              <div className="header-user__menu-icons">
                <div className="header-user__icon-item">
                  <FaShoppingCart
                    style={{ color: "#838383" }}
                    onClick={() => navigate("/cart")}
                  />
                  <span className="header-user__icon-badge-cart">
                    {cartItems.length}
                  </span>
                </div>
                <div className="header-user__icon-item">
                  <FaHeart
                    style={{ color: "#838383" }}
                    onClick={() => navigate("/favorite-products")}
                  />
                  <span className="header-user__icon-badge-heart">
                    {wishlistItems.length}
                  </span>
                </div>
                <div
                  className="header-user__icon-item"
                  onClick={toggleMenu}
                  ref={userMenuRef}
                >
                  <FaUser />
                  <span className="header-user__username">
                    {user?.firstname || "User"}
                  </span>
                  {showMenu && (
                    <div className="header-user__dropdown">
                      {!token ? (
                        <div className="p-3">
                          <p className="">Xin chào, vui lòng đăng nhập</p>
                          <button
                            className="btn btn-primary rounder-3"
                            onClick={() => navigate("/login")}
                          >
                            Login
                          </button>
                          <div
                            className="d-flex justify-content-center align-items-center mt-2 gap-2"
                            style={{ width: "100%" }}
                          >
                            <span
                              className="text-muted"
                              style={{ fontSize: "12px" }}
                            >
                              No account yet?
                            </span>
                            <button
                              className="btn btn-danger w-50"
                              onClick={() => navigate("/register")}
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            className="header-user__dropdown-item"
                            onClick={() => navigate("/my-account")}
                          >
                            My Account
                          </div>
                          {userInfor.role.code === "ADMIN" && (
                            <div
                              className="header-user__dropdown-item"
                              onClick={() => navigate("/admin/dashboard")}
                            >
                              Admin
                            </div>
                          )}
                          {(userInfor.role.code === "ADMIN" ||
                            userInfor.role.code === "MANAGER") && (
                            <div
                              className="header-user__dropdown-item"
                              onClick={() => navigate("/manager/dashboard")}
                            >
                              Manager
                            </div>
                          )}
                          <div
                            className="header-user__dropdown-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
          {/* Banner chính */}
          <div className="row">
            {/* Danh sách danh mục */}
              <div className="col-3 text-md-start" style={{ position: !showBanner ? "fixed" : "relative",backgroundColor: "white", zIndex: 1, width: !showBanner ? "16%" : "", boxShadow: !showBanner ? "0 0 5px rgba(0, 0, 0, 0.1)" : "" }}>
                {showCategories && (
                  <ul className="header-user__category-list">
                    {getCategories_NoPaging &&
                      getCategories_NoPaging.map((category) => (
                        <li
                          key={category.id}
                          className="header-user__category-item"
                          onClick={() =>
                            navigate(`/categories/${category.name.toLowerCase()}`, {
                              state: { categoryId: category.id },
                            })
                          }
                        >
                          {category.name}
                          <FaChevronDown className="header-user__chevron-icon" />
                        </li>
                      ))}
                  </ul>
                )}
              </div>

            {/* Banner chính ở giữa */}
            {showBanner && (
              <>
                <div className="col-7">
                  {banners.length > 0 && (
                    <div className="header-user__macbook-card">
                      <div className="header-user__macbook-content">
                        <div className="header-user__category">
                          <span className="header-user__icon">
                            {banners[activeIndex].icon}
                          </span>{" "}
                          {banners[activeIndex].category}
                        </div>
                        <h2 className="header-user__title">
                          {banners[activeIndex].title.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </h2>
                        <button className="header-user__shop-button">
                          Shop Now →
                        </button>
                        <div className="header-user__dots">
                          {banners.map((_, index) => (
                            <span
                              key={index}
                              className={`header-user__dot ${
                                index === activeIndex ? "active" : ""
                              }`}
                            ></span>
                          ))}
                        </div>
                      </div>
                      <img
                        src={banners[activeIndex].img}
                        alt={banners[activeIndex].title}
                        className="header-user__macbook-img"
                      />
                    </div>
                  )}
                  <SaleTopPrice />
                </div>
                {/* Sản phẩm nổi bật */}
                <div className="col-2 text-end">
                  <div className="header-user__bag-card">
                    <img
                      src="/images/product/samsung-galaxy-z-flip6-2.jpg"
                      alt="Yantiti Leather Bag"
                      className="header-user__bag-img"
                    />
                    <p className="header-user__bag-name">Yantiti Leather Bags</p>
                    <p className="header-user__bag-price">500.000 VNĐ</p>
                  </div>
                </div>
              </>
            )}
          </div>
        {/* Liên hệ nhân viên */}
        {showBanner && (
          <div className="contact-container">
            <div className="contact-box">
              <img src="/images/icon/phone-icon.png" alt="Phone" />
              <div>
                <p>Nhân viên kinh doanh 1</p>
                <b>090 6979 036</b>
              </div>
            </div>
            <div className="contact-box">
              <img src="/images/icon/phone-icon.png" alt="Phone" />
              <div>
                <p>Nhân viên kinh doanh 2</p>
                <b>0937 117 336</b>
              </div>
            </div>
            <div className="contact-box">
              <img src="/images/icon/phone-icon.png" alt="Phone" />
              <div>
                <p>Nhân viên kinh doanh 3</p>
                <b>0909 68 2336</b>
              </div>
            </div>
            <div className="contact-box">
              <img src="/images/icon/phone-icon.png" alt="Phone" />
              <div>
                <p>Nhân viên kinh doanh 4</p>
                <b>0909 12 2336</b>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderUser;

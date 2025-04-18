// Nhập các thư viện và hook cần thiết
import React, { useEffect, useState,useRef } from "react";
import { FaBars, FaChevronDown, FaShoppingCart, FaUser, FaHeart, FaEye } from "react-icons/fa";
import "../../../src/assets/css/HeaderUser.css";
import AnnouncementBar from "./AnnouncementBar.jsx";
import useDashboardData from "../../hooks/useDashboardData "; // Hook lấy dữ liệu dashboard
import useUser from "../../hooks/useUser.js"; // Hook lấy thông tin người dùng
import SaleTopPrice from "./Saletopprice.jsx";
import { useNavigate } from 'react-router-dom';


const HeaderUser = () => {

  const navigate = useNavigate();

  const { userInfor } = useUser(0, 1);
  // const categories = ["LapTop", "Phone", "Accessory"];

  const { recentlyProduct } = useDashboardData();

  const userMenuRef = useRef(); //  Gán useRef cho menu

  //  Xử lý dữ liệu banner từ sản phẩm gần đây
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
            : `/images/product/${product.thumbnail?.replace(/^[^_]+_[^_]+_/, "")}`,
        }))
      : [];

  const [activeIndex, setActiveIndex] = useState(0);

  // Tự động chuyển banner mỗi 4 giây
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Biến trạng thái để điều khiển hiển thị menu
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);

  // Tự động đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header-user">
      {/* Thanh thông báo đầu trang */}
      <AnnouncementBar />

      <div className="container-fluid py-3">
        {/* Header trên cùng */}
        <div className="row align-items-center">
          {/* Logo */}
          <button className="col-3 text-center text-md-start bg-white" onClick={() => navigate('/')}>
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
        <div className="row align-items-center mt-3">
          <div className="col-3 text-center text-md-start">
            <div className="header-user__category-header">
              <FaBars className="header-user__menu-icon" />
              Categories
            </div>
          </div>

          <div className="col-7">
            <ul className="header-user__menu">
              <li><a onClick={() => navigate('/')}  className="active">Home</a></li>
              <li><a  onClick={() => navigate('/user')}>Shop</a></li>
              <li><a href="#">Pages</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="col-2 text-end">
            <div className="header-user__menu-icons">
              <div className="header-user__icon-item">
                <FaShoppingCart style={{color:'#838383' }}/>
                <span className="header-user__icon-badge-cart">2</span>
              </div>
              <div className="header-user__icon-item">
                <FaHeart style={{color:'#838383' }} />
                <span className="header-user__icon-badge-heart">12</span>
              </div>
              <div className="header-user__icon-item" onClick={toggleMenu} ref={userMenuRef}>
                <FaUser />
                <span className="header-user__username">{userInfor?.firstname || "User"}</span>
                {showMenu && (
                  <div className="header-user__dropdown">
                    <div className="header-user__dropdown-item" onClick={() => navigate('/login')} > Login </div>
                    <div className="header-user__dropdown-item" onClick={() => navigate('/login')} >Logout</div>
                    <div className="header-user__dropdown-item" onClick={() => navigate('/manager')} >Manager</div>
                    <div className="header-user__dropdown-item" onClick={() => navigate('/admin')} >Admin</div>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>

        {/* Banner chính */}
        <div className="row mt-3">
          {/* Danh sách danh mục */}
          <div className="col-3 text-center text-md-start">
            <ul className="header-user__category-list">
              <li className="header-user__category-item" onClick={() => navigate('/categories-all-laptop')} >
                LapTop
                <FaChevronDown className="header-user__chevron-icon" />
              </li>
              <li className="header-user__category-item" onClick={() => navigate('/categories-all-phone')}>
                Phone
                <FaChevronDown className="header-user__chevron-icon" />
              </li>
              <li className="header-user__category-item" onClick={() => navigate('/categories-all-accessory')}>
                Accessory
                <FaChevronDown className="header-user__chevron-icon" />
              </li>
            </ul>
          </div>

          {/* Banner chính ở giữa */}
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
                  <button className="header-user__shop-button">Shop Now →</button>

                  <div className="header-user__dots">
                    {banners.map((_, index) => (
                      <span
                        key={index}
                        className={`header-user__dot ${index === activeIndex ? "active" : ""}`}
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
        </div>
      </div>
     
    </div>
  );
};

export default HeaderUser;

import React, { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaShoppingCart, FaUser,FaHeart,FaEye} from "react-icons/fa";
import "../../../src/assets/css/HeaderUser.css";
import AnnouncementBar from "./AnnouncementBar.jsx";




const HeaderUser = () => {
  const categories = ["Computer", "Phone", "Accessory"];

    // Dữ liệu các brand
    const banners = [
      {
        category: "Macbook",
        icon: "💻",
        title: "Macbook Pro\nM2 – Strong Performance",
        img: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
      },
      {
        category: "Samsung",
        icon: "📱",
        title: "Galaxy Z Flip6\nFlex Your Style",
        img: "../../../public/images/product/oppo-a38-black-2.jpeg",
      },
      {
        category: "Sony",
        icon: "🎧",
        title: "Sony WH-1000XM5\nNoise Cancelling King",
        img: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
      },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    // Tự động chuyển banner sau mỗi 4 giây
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 4000);
  
      return () => clearInterval(interval);
    }, [banners.length]);

  return (
    <div className="header-user">
      {/* AnnouncementBar */}
      <AnnouncementBar />


      <div className="container-fluid py-3">
        {/* Top Header */}
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-3 text-center text-md-start">
            <img
              src="../../../public/images/logo/logo-large.png"
              alt="TechMart Logo"
              className="img-fluid"
              style={{ maxHeight: "50px" }}
            />
          </div>

          {/* Search */}
          <div className="col-7">
            <form className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm..."
              />
            </form>
          </div>

          {/* Language + Currency */}
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

        {/* Categories + Navbar */}
        <div className="row align-items-center mt-3">
          {/* Categories */}
          <div className="col-3 text-center text-md-start">
            <div className="header-user__category-header">
              <FaBars className="header-user__menu-icon" />
              Categories
            </div>
          </div>

          {/* Navbar Menu */}
          <div className="col-7">
            <ul className="header-user__menu">
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Pages</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Icons */}
          <div className="col-2 text-end">
            <div className="header-user__menu-icons">
              <div className="header-user__icon-item">
                <FaShoppingCart />
                <span className="header-user__icon-badge">2</span>
              </div>
              <div className="header-user__icon-item">
                <FaUser />
                <span className="header-user__username">Minh Tiến</span>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Section */}
        <div className="row mt-3">
        {/* Categories List */}
        <div className="col-3 text-center text-md-start">
          <ul className="header-user__category-list">
            {categories.map((cat, index) => (
              <li key={index} className="header-user__category-item">
                {cat}
                <FaChevronDown className="header-user__chevron-icon" />
              </li>
            ))}
          </ul>
        </div>

        {/* Banner Carousel */}
        <div className="col-7">
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
        </div>

          {/* Featured Product */}
          <div className="col-2 text-end">
            <div className="header-user__bag-card">
              <img
                src="../../../public/images/product/samsung-galaxy-z-flip6-2.jpg"
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

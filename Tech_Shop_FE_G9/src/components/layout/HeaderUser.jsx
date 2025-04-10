import React from "react";
import { FaBars, FaChevronDown, FaShoppingCart, FaUser } from "react-icons/fa";
import "../../../src/assets/css/HeaderUser.css";

const HeaderUser = () => {
  const categories = ["Computer", "Phone", "Accessory"];

  return (
    <div className="header-user">
      <div className="container-fluid py-3">
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
            {/* <ul className="header-user__category-list">
              {categories.map((cat, index) => (
                <li key={index} className="header-user__category-item">
                  {cat}
                  <FaChevronDown className="header-user__chevron-icon" />
                </li>
              ))}
            </ul> */}
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
                <span>Minh Tiến</span>

              </div>
            </div>
          </div>
        </div>


        <div className="row  mt-3">
          {/* Categories */}
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

          {/* Navbar Menu */}
          <div className="col-7">
                <div className="header-user__macbook-card">
              <div className="header-user__macbook-content">
                <div className="category">
                  <span className="header-user__icon">💻</span> Macbook
                </div>
                <h2 className="header-user__title">
                  Macbook Pro <br /> M2 – Strong Performance
                </h2>
                <button className="header-user__shop-button">Shop Now →</button>
                <div className="header-user__dots">
                  <span className="header-user__dot active"></span>
                  <span className="header-user__dot"></span>
                  <span className="header-user__dot"></span>
                </div>
              </div>
              <img
                src="https://www.shutterstock.com/shutterstock/photos/1867182559/display_1500/stock-photo-december-new-macbook-air-silicon-m-with-light-reflections-1867182559.jpg"
                alt="Macbook Pro M2"
                className="header-user__macbook-img"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="col-2 text-end">
          <div className="header-user__bag-card">
        <img
                src="https://www.shutterstock.com/shutterstock/photos/1867182559/display_1500/stock-photo-december-new-macbook-air-silicon-m-with-light-reflections-1867182559.jpg"
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

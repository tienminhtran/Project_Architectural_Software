import React, { useState } from 'react';
import "../../../assets/css/AccountPage.css";
import { FaUser, FaMapMarkerAlt, FaBoxOpen, FaEye, FaSignOutAlt } from 'react-icons/fa';
import AddressBook from "./AddressBook"; // Ensure path is correct
import OrderManagement from "./OrderManagement"; // Ensure path is correct
import StoreLocator from './StoreLocator'; // Ensure path is correct
import HeaderUserBasic from '../../../components/layout/HeaderUserBasic';
import Footer from '../../../components/layout/Footer';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("info");

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <>
            <h2>Thông tin tài khoản</h2>
            <div className="account-page__form-group">
              <label>Họ Tên</label>
              <input type="text" defaultValue="tien tot" />
            </div>

            <div className="account-page__form-group">
              <label>Giới tính</label>
              <div className="account-page__gender-group">
                <label><input type="radio" name="gender" defaultChecked /> Nam</label>
                <label><input type="radio" name="gender" /> Nữ</label>
              </div>
            </div>

            <div className="account-page__form-group">
              <label>Số điện thoại</label>
              <input type="text" placeholder="Nhập số điện thoại" />
            </div>

            <div className="account-page__form-group">
              <label>Email</label>
              <input type="email" defaultValue="tientot36@gmail.com" readOnly />
            </div>

            <div className="account-page__form-group">
              <label>Ngày sinh</label>
              <input type="date" placeholder="Chọn ngày sinh" />
            </div>

            <button className="account-page__btn-save">Lưu thay đổi</button>
          </>
        );
      case "address":
        return <AddressBook />;
      case "orders":
        return <OrderManagement />;
      case "store":
        return <StoreLocator />;
      case "logout":
        return <h2>Đăng xuất thành công</h2>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <HeaderUserBasic />
      </div>    
      
      
        <div className="account-page__container">
        
        <div className="account-page__sidebar">
          <div className="account-page__avatar">
            <img src="/avatar.png" alt="avatar" />
            <h3>tien tot</h3>
          </div>
          <ul>
            <li onClick={() => setActiveTab("info")} className={activeTab === "info" ? "account-page__active" : ""}>
              <FaUser className="account-page__icon" /> Thông tin tài khoản
            </li>
            <li onClick={() => setActiveTab("address")} className={activeTab === "address" ? "account-page__active" : ""}>
              <FaMapMarkerAlt className="account-page__icon" /> Sổ địa chỉ
            </li>
            <li onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "account-page__active" : ""}>
              <FaBoxOpen className="account-page__icon" /> Quản lý đơn hàng
            </li>
            <li onClick={() => setActiveTab("store")} className={activeTab === "store" ? "account-page__active" : ""}>
              <FaEye className="account-page__icon" /> Tìm cửa hàng
            </li>
            <li onClick={() => setActiveTab("logout")} className={activeTab === "logout" ? "account-page__active" : ""}>
              <FaSignOutAlt className="account-page__icon" /> Đăng xuất
            </li>
          </ul>
        </div>

        <div className="account-page__main-content">{renderContent()}</div>
      </div>
      <Footer />
    </div>

  );
};

export default AccountPage;
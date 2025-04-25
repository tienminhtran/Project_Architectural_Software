import React, { useState } from "react";
import "../../../assets/css/OrderManagement.css";

const tabs = ["TẤT CẢ", "MỚI", "ĐANG XỬ LÝ", "ĐANG VẬN CHUYỂN", "HOÀN THÀNH", "HUỶ"];

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("TẤT CẢ");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="order-management__container">
      <h2>Quản lý đơn hàng</h2>
      <div className="order-management__tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`order-management__tab ${activeTab === tab ? "order-management__tab--active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="order-management__search-box">
        <input
          type="text"
          placeholder="Tìm đơn hàng theo Mã đơn hàng"
          value={search}
          onChange={handleSearch}
        />
        <button className="order-management__search-btn">Tìm đơn hàng</button>
      </div>

      <div className="order-management__order-empty">
        <img src="../../../../public/images/don-hang-trong.png" alt="No Orders" />
        <p>Quý khách chưa có đơn hàng nào.</p>
        <button className="order-management__continue-btn">TIẾP TỤC MUA HÀNG</button>
      </div>
    </div>
  );
};

export default OrderManagement;

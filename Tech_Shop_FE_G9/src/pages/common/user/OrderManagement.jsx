import React, { useState } from "react";
import "../../../assets/css/OrderManagement.css";
import useUser from "../../../hooks/useUser";
import useOrder from "../../../hooks/useOrder";

const tabs = [
  "TẤT CẢ",
  "CHƯA XỬ LÝ",
  "VẬN CHUYỂN",
  "HOÀN TRẢ",
  "HOÀN THÀNH",
  "HUỶ",
];

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("TẤT CẢ");
  const [search, setSearch] = useState("");

  const { userInfor } = useUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { getOrderByUserAndOrderStatus } = useOrder(
    0,
    10,
    "",
    "",
    "",
    "",
    userInfor?.id,
    activeTab
  );
  console.log("getOrderByUserAndOrderStatus", getOrderByUserAndOrderStatus);

  // Get orders from the hook
  const orders = Array.isArray(getOrderByUserAndOrderStatus)
    ? getOrderByUserAndOrderStatus
    : [];

  console.log("orders", orders);

  // Filter orders based on search input
  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(search.trim())
  );

  // Get current orders for the active page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Helper functions for displaying order information
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Get CSS class for status styling
  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "status-pending";
      case "DELIVERED":
        return "status-shipping";
      case "REFUND":
        return "status-returned";
      case "COMPLETED":
        return "status-completed";
      case "CANCELLED":
        return "status-cancelled";
      default:
        return "";
    }
  };

  // Translate status to Vietnamese
  const translateStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "CHƯA XỬ LÝ";
      case "DELIVERED":
        return "VẬN CHUYỂN";
      case "REFUND":
        return "HOÀN TRẢ";
      case "COMPLETED":
        return "HOÀN THÀNH";
      case "CANCELLED":
        return "HUỶ";
      default:
        return status;
    }
  };

  return (
    <div className="order-management__container">
      <h2>Quản lý đơn hàng</h2>
      <div className="order-management__tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`order-management__tab ${
              activeTab === tab ? "order-management__tab--active" : ""
            }`}
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
        {/* <button className="order-management__search-btn">Tìm đơn hàng</button> */}
      </div>
      {filteredOrders.length === 0 ? (
        <div className="order-management__order-empty">
          <img
            src="../../../../public/images/don-hang-trong.png"
            alt="No Orders"
          />
          <p>Quý khách chưa có đơn hàng nào.</p>
          <button className="order-management__continue-btn">
            TIẾP TỤC MUA HÀNG
          </button>
        </div>
      ) : (
        <>
          <div className="order-management__orders">
            {currentOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id">Đơn hàng #{order.id}</div>
                  <div
                    className={`order-status ${getStatusClass(order.status)}`}
                  >
                    {translateStatus(order.status)}
                  </div>
                </div>

                <div className="order-details">
                  <div className="order-date">
                    <strong>Ngày đặt:</strong> {formatDate(order.createdAt)}
                  </div>
                  <div className="order-items">
                    <strong>Sản phẩm:</strong> {order.totalProduct} sản phẩm
                  </div>
                  <div className="order-total">
                    <strong>Tổng tiền:</strong>{" "}
                    {formatCurrency(order.totalPrice)}
                  </div>
                </div>

                <div className="order-actions">
                  {/* <Link
                  to={`/order-detail/${order.id}`}
                  className="view-detail-btn"
                >
                  Xem chi tiết
                </Link> */}

                  {order.status === "PENDING" && (
                    <button className="cancel-order-btn">Hủy đơn hàng</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add pagination controls */}
          <div className="pagination">
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                &laquo; Trước
              </button>

              {/* Display page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`pagination-button ${
                      number === currentPage ? "active" : ""
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Tiếp &raquo;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderManagement;

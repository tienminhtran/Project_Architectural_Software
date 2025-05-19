import React, { useState } from "react";
import "../../../assets/css/OrderManagement.css";
import useUser from "../../../hooks/useUser";
import useOrder from "../../../hooks/useOrder";
import useOrderDetail from "../../../hooks/useOrderDetail";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const { getOrderDetailByOrderId, isLoading, isError } =
    useOrderDetail(selectedOrderId);

  const dataOrderDetail = getOrderDetailByOrderId?.response;

  // Get orders from the hook
  const orders = Array.isArray(getOrderByUserAndOrderStatus)
    ? getOrderByUserAndOrderStatus
    : [];

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
        return "status-pending1";
      case "DELIVERED":
        return "status-shipping1";
      case "REFUND":
        return "status-returned1";
      case "COMPLETED":
        return "status-completed1";
      case "CANCELLED":
        return "status-cancelled1";
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

  // Add this helper function alongside your other translation functions
  const translatePaymentMethod = (method) => {
    switch (method.toLowerCase()) {
      case "cod":
        return "Thanh toán khi nhận hàng (COD)";
      case "bank":
        return "Chuyển khoản ngân hàng";
      case "paypal":
        return "Ví điện tử PayPal";
      default:
        return method;
    }
  };

  // Add handler for viewing order details
  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    const order = orders.find((order) => order.id === orderId);
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Add handler for closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
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
                    <strong>Số sản phẩm:</strong> {order.totalProduct} sản phẩm
                  </div>
                  <div className="order-address">
                    <strong>Địa chỉ giao hàng:</strong>{" "}
                    {order.address
                      ? `${order.address.detailLocation}, ${order.address.street}, ${order.address.district}, ${order.address.city}`
                      : "Không có thông tin"}
                  </div>
                  <div className="order-payment">
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {order.payment
                      ? translatePaymentMethod(order.payment.paymentName)
                      : "Không có thông tin"}
                  </div>
                  <div className="order-total">
                    <strong>Tổng tiền:</strong>{" "}
                    {formatCurrency(order.totalPrice)}
                  </div>
                </div>

                <div className="order-actions">
                  <button
                    className="view-detail-btn"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    Xem chi tiết
                  </button>

                  {order.status === "PENDING" && (
                    <button className="cancel-order-btn">Hủy đơn hàng</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add pagination controls */}
          <div className="pagination1">
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

      {/* Add Order Detail Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng #{selectedOrderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="text-center">
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : !dataOrderDetail ? (
            <div className="text-center">
              <p>Không tìm thấy dữ liệu đơn hàng.</p>
            </div>
          ) : (
            <div className="order-detail-content">
              <div className="order-info">
                <p>
                  <strong>Mã đơn hàng:</strong> #{dataOrderDetail.orderId}
                </p>
                <p>
                  <strong>Khách hàng:</strong> {dataOrderDetail.customerName}
                </p>
                <p>
                  <strong>Ngày đặt:</strong>{" "}
                  {formatDate(dataOrderDetail.createdAt)}
                </p>

                {selectedOrder?.voucher && (
                  <div className="voucher-info">
                    <p>
                      <strong>Mã giảm giá:</strong> {selectedOrder.voucher.name}
                    </p>
                    <p>
                      <strong>Số tiền giảm:</strong>{" "}
                      {formatCurrency(
                        (dataOrderDetail.totalPrice *
                          selectedOrder.voucher.value) /
                          100
                      )}
                    </p>
                  </div>
                )}
                <p>
                  <strong>Tổng tiền hàng:</strong>{" "}
                  {formatCurrency(dataOrderDetail.totalPrice)}
                </p>
                <p
                  className={`final-price ${
                    selectedOrder?.voucher ? "with-discount" : ""
                  }`}
                >
                  <strong>Thành tiền:</strong>{" "}
                  {selectedOrder?.voucher
                    ? formatCurrency(
                        dataOrderDetail.totalPrice -
                          (dataOrderDetail.totalPrice *
                            selectedOrder.voucher.value) /
                            100
                      )
                    : formatCurrency(dataOrderDetail.totalPrice)}
                  {selectedOrder?.voucher && (
                    <span className="discount-badge">Đã giảm giá</span>
                  )}
                </p>
              </div>

              <div className="order-products">
                <h5>Danh sách sản phẩm</h5>
                <div className="table-container">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataOrderDetail.items &&
                        dataOrderDetail.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                            <td>{formatCurrency(item.unitPrice)}</td>
                            <td>{formatCurrency(item.totalPrice)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManagement;

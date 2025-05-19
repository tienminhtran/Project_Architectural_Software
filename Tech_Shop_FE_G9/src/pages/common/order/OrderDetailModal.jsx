import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import useOrderDetail from "../../../hooks/useOrderDetail";

const OrderDetailModal = ({ show, onHide, order }) => {
  const { getOrderDetailByOrderId, isLoading, isError } = useOrderDetail(
    order?.id
  );
  // Tính tổng tiền của đơn hàng
  const totalAmount = getOrderDetailByOrderId?.response?.items?.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  // Kiểm tra xem orderDetail có dữ liệu hay không
  if (isLoading) return null; // Không hiển thị nếu đang tải dữ liệu

  if (!order) return null; // Không hiển thị nếu không có dữ liệu đơn hàng

  const detail = getOrderDetailByOrderId?.response; // Lấy object `response` từ `orderDetail`

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading order details...</p>
          </div>
        ) : isError ? (
          <p className="text-danger">Failed to load order details.</p>
        ) : (
          <>
            {/* Order Info */}
            <div className="row mb-3">
              <div className="col-md-6">
                <p className="fs-6 mb-2">
                  <strong>Order ID:</strong> {detail?.orderId || "N/A"}
                </p>
              </div>
              <div className="col-md-6">
                <p className="fs-6 mb-2">
                  <strong>Created At:</strong>{" "}
                  {detail?.createdAt
                    ? new Date(detail.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="row mb-3">
              <div className="col-md-6">
                <p className="fs-6 mb-2">
                  <strong>Full Name:</strong> {detail?.customerName || "N/A"}
                </p>
              </div>
              <div className="col-md-6">
                <p className="fs-6 mb-2">
                  <strong>Phone Number:</strong>{" "}
                  {order.user.phone_number || "N/A"}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="row mb-3">
              <div className="col-12 ">
                <p className="fs-6 mb-2">
                  <strong>Address:</strong>{" "}
                  {order.address.detailLocation || "N/A"},{" "}
                  {order.address.street || "N/A"},{" "}
                  {order.address.district || "N/A"},{" "}
                  {order.address.city || "N/A"}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="row mb-3">
              <div className="col-12">
                <p className="fs-6 mb-2">
                  <strong>Products:</strong>
                </p>
                {detail?.items?.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price (VND)</th>
                        <th>Total Price (VND)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.items.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <a href="#" style={{ textDecoration: "none" }}>
                              {item.productName || "Unknown Product"}
                            </a>
                          </td>
                          <td>{item.quantity || 0}</td>
                          <td>
                            {item.unitPrice
                              ? item.unitPrice.toLocaleString()
                              : "N/A"}
                          </td>
                          <td>
                            {item.totalPrice
                              ? item.totalPrice.toLocaleString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>

            {/* Total Amount */}
            <div className="row">
              <div className="col-12 ">
                <p className="fw-bold text-end">
                  <strong>Total Amount:</strong>{" "}
                  {totalAmount ? totalAmount.toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailModal;

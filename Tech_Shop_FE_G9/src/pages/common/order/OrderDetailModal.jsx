import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import useOrderDetail from "../../../hooks/useOrderDetail";

const OrderDetailModal = ({ show, onHide, order }) => {
    const { data: orderDetail, isLoading, isError } = useOrderDetail(order?.id);

    if (!order) return null; // Không hiển thị nếu không có dữ liệu đơn hàng

    console.log("Order Detail:", orderDetail); // Log toàn bộ dữ liệu trả về từ API

    const detail = orderDetail?.response; // Lấy object `response` từ `orderDetail`

    return (
        <Modal show={show} onHide={onHide} centered>
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
                        <p>
                            <strong>Full name customer: </strong>
                            {detail?.customerName || "N/A"}
                        </p>
                        <p>
                            <strong>Order ID:</strong>{" "}
                            {detail?.orderId || "N/A"}
                        </p>
                        <p>
                            <strong>Total Price:</strong>{" "}
                            {detail?.totalPrice
                                ? detail.totalPrice.toLocaleString() + " VND"
                                : "N/A"}
                        </p>
                        <p>
                            <strong>Created At:</strong>{" "}
                            {detail?.createdAt
                                ? new Date(detail.createdAt).toLocaleString()
                                : "N/A"}
                        </p>
                        <p>
                            <strong>Products:</strong>
                        </p>
                        <ul>
                            {detail?.items?.length > 0 ? (
                                detail.items.map((item, index) => (
                                    <li key={index}>
                                        {item.productName || "Unknown Product"}{" "}
                                        - {item.quantity || 0} x{" "}
                                        {item.unitPrice
                                            ? item.unitPrice.toLocaleString() +
                                              " VND"
                                            : "N/A"}{" "}
                                        (Total:{" "}
                                        {item.totalPrice
                                            ? item.totalPrice.toLocaleString() +
                                              " VND"
                                            : "N/A"}
                                        )
                                    </li>
                                ))
                            ) : (
                                <li>No products available</li>
                            )}
                        </ul>
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

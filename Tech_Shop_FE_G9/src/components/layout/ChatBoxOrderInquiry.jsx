import React, { useState } from "react";
import useOrder from "../../hooks/useOrder";

export default function OrderByPhone() {
  const [phoneInput, setPhoneInput] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const { getOrderByPhoneNumber, deleteOrder } = useOrder(
    1,
    10,
    "",
    "",
    "",
    searchPhone
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneInput.trim()) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }
    setSearchPhone(phoneInput.trim());
  };

  // CSS inline style
  const styles = {
    container: {
      maxWidth: 600,
      margin: "20px auto",
      padding: 20,
      border: "1px solid #ddd",
      borderRadius: 8,
      backgroundColor: "#fafafa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 20,
    },
    label: {
      fontWeight: "600",
      marginBottom: 6,
      fontSize: 16,
    },
    input: {
      padding: "10px 14px",
      fontSize: 16,
      borderRadius: 6,
      border: "1px solid #ccc",
      outlineOffset: 2,
      outlineColor: "#4a90e2",
      transition: "border-color 0.3s",
    },
    button: {
      padding: "10px 0",
      fontSize: 16,
      fontWeight: "600",
      color: "white",
      backgroundColor: "#4a90e2",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#357ABD",
    },
    ordersContainer: {
      marginTop: 20,
    },
    orderCard: {
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    orderRow: {
      marginBottom: 6,
      fontSize: 15,
      color: "#333",
    },
    noOrderText: {
      marginTop: 20,
      fontStyle: "italic",
      color: "#999",
      textAlign: "center",
      fontSize: 16,
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nhập số điện thoại:
          <input
            type="text"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="0862058920"
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Tìm đơn hàng
        </button>
      </form>

      {getOrderByPhoneNumber.length > 0 ? (
        <div style={styles.ordersContainer}>
          <h3>Đơn hàng tìm thấy: {getOrderByPhoneNumber.length}</h3>
          {getOrderByPhoneNumber.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <p style={styles.orderRow}>
                <b>Mã đơn:</b> {order.id}
              </p>
              <p style={styles.orderRow}>
                <b>Trạng thái:</b> {order.status}
              </p>
              <p style={styles.orderRow}>
                <b>Thanh toán:</b> {order.payment.paymentName}
              </p>
              <p style={styles.orderRow}>
                <b>Địa chỉ:</b> {order.address.detailLocation},{" "}
                {order.address.street}, {order.address.district},{" "}
                {order.address.city}
              </p>
              <p style={styles.orderRow}>
                <b>Voucher:</b> {order.voucher ? order.voucher.name : "Không có"}
              </p>
              <p style={styles.orderRow}>
                <b>Người dùng:</b> {order.user.firstname} {order.user.lastname}
              </p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        searchPhone && (
          <p style={styles.noOrderText}>
            Không tìm thấy đơn hàng nào với số điện thoại {searchPhone}
          </p>
        )
      )}
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import CheckoutStepper from "./CheckoutStepper";
import { useLocation } from "react-router-dom";
import "../../assets/css/OrderComplete.css";
// import DeliveryWithGeolocation from './DeliveryWithGeolocation';
import FooterUser from "../../components/layout/Footer";
import HeaderUser from "../../components/layout/HeaderUser";
const OrderComplete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { orderInfo } = location.state || {};

  //   const orderInfo = {
  //     orderNumber: "123456789",
  //     deliveryDate: "25/04/2025",
  //     totalAmount: "219.000đ",
  //     deliveryAddress: "Số 123, Đường ABC, Quận 1, TP. HCM",
  //   };

  const handleViewSchedule = () => {
    setIsModalOpen(true); // Mở modal khi nhấn nút Xem lịch trình
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
  };

  return (
    <div>
      <HeaderUser showCategory={false} showBanner={false} />
      <div style={{ display: "flex" }}>
        <div>
          <img
            src="../../../public/images/bg/thu-cu-doi-moi.png"
            alt="Logo"
            className="CartBuy-OrderBox__logo"
            style={{ width: "160px" }}
          />
        </div>

        <div className="OrderComplete__container">
          <CheckoutStepper currentStep={3} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="OrderComplete__section"
          >
            <div className="OrderComplete__title">Hoàn tất đơn hàng</div>
            <div className="OrderComplete__info">
              <div className="OrderComplete__row">
                <span>
                  <strong>Mã đơn hàng:</strong> {orderInfo.orderNumber}
                </span>
              </div>
              <div className="OrderComplete__row">
                <span>
                  <strong>Tổng tiền:</strong> {orderInfo.totalAmount}
                </span>
              </div>
              <div className="OrderComplete__row">
                <span>
                  <strong>Địa chỉ giao hàng:</strong>{" "}
                  {orderInfo.deliveryAddress}
                </span>
              </div>
              <div className="OrderComplete__row">
                <span>
                  <strong>Ngày giao dự kiến:</strong> {orderInfo.deliveryDate}
                </span>
              </div>
            </div>

            <div className="OrderComplete__action">
              <button
                className="OrderComplete__scheduleBtn"
                onClick={handleViewSchedule}
              >
                Xem lịch trình giao hàng
              </button>
            </div>
          </motion.div>

          {/* Modal hiển thị lịch trình giao hàng */}
          {isModalOpen && (
            <div className="OrderComplete__modal">
              <div className="OrderComplete__modalContent">
                <div className="OrderComplete__modalHeader">
                  <h2>Lịch trình giao hàng</h2>
                  <button
                    className="OrderComplete__closeBtn"
                    onClick={closeModal}
                  >
                    X
                  </button>
                </div>
                <div className="OrderComplete__modalBody">
                  <p>
                    <strong>Ngày giao:</strong> {orderInfo.deliveryDate}
                  </p>
                  <p>
                    <strong>Giờ giao:</strong> {orderInfo.deliveryTime}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {orderInfo.deliveryAddress}
                  </p>
                  <p>
                    <strong>Ghi chú:</strong>{" "}
                    {orderInfo.customerNote || "Không có"}
                  </p>
                  {/* <DeliveryWithGeolocation /> Hiển thị bản đồ và thông tin giao hàng */}
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <img
            src="../../../public/images/bg/mua-he-ruc-ro.png"
            alt="Logo"
            className="CartBuy-OrderBox__logo"
            style={{ width: "160px" }}
          />
        </div>
      </div>

      <FooterUser />
    </div>
  );
};

export default OrderComplete;

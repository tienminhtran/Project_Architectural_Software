import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CheckoutStepper from "./CheckoutStepper";
import "../../assets/css/OrderPayment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PayPalButton from "./PayPalButton";
import FooterUser from "../../components/layout/Footer";
import useOrder from "../../hooks/useOrder";
import { v4 as uuidv4 } from "uuid";
import HeaderUser from "../../components/layout/HeaderUser";
// Helper function to format currency
const formatCurrency = (amount) => {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

// Component tạo mã QR ngân hàng TCB
const BankQR = ({ amount, orderCode }) => {
  const bankId = "TCB";
  const accountNumber = "19038207576016"; // thay bằng số tài khoản thật
  const qrURL = `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.jpg?amount=${amount}&addInfo=${orderCode}`;

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <h4>Quét mã để chuyển khoản Techcombank</h4>
      <img src={qrURL} alt="QR chuyển khoản" style={{ width: "220px" }} />
      <p>
        <strong>Nội dung chuyển khoản:</strong> {orderCode}
      </p>
    </div>
  );
};

const OrderPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const orderCode = "G-Nice-" + Date.now(); // random mã đơn hàng

  //   console.log("Location state:", location.state);
  // Lấy thông tin người dùng từ location state
  const { userId, addressId } = location.state || {};

  const { createOrder } = useOrder();

  useEffect(() => {
    const storedData = sessionStorage.getItem("cartData");
    console.log("storedData", storedData);
    if (storedData) {
      setCartData(JSON.parse(storedData));
    } else {
      navigate("/"); // Nếu không có dữ liệu, điều hướng về trang giỏ hàng
    }
  }, [navigate]);

  const totalAmount = cartData ? cartData.totalPrice + 19000 : 0; // Tạm tính + phí vận chuyển

  console.log("CartData", cartData);
  const handleCreateOrder = async () => {
    try {
      setIsLoading(true);

      // Kiểm tra thông tin người dùng
      if (!userId) {
        alert("Vui lòng đăng nhập để thanh toán.");
        return;
      }

      // Kiểm tra địa chỉ giao hàng
      if (!addressId) {
        alert("Vui lòng chọn địa chỉ giao hàng trước khi thanh toán.");
        return;
      }

      // Lấy voucher đã áp dụng từ sessionStorage
      const appliedVoucher = cartData.appliedVoucher;

      console.log("appliedVoucher", appliedVoucher);

      // Kiểm tra giỏ hàng có sản phẩm không
      if (!cartData || !cartData.cartItems || cartData.cartItems.length === 0) {
        alert("Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
      }

      // Lấy dữ liệu giỏ hàng từ cartData
      const orderDetails = cartData.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      // Tạo đối tượng orderRequest
      const orderRequest = {
        userId: userId,
        paymentMethod: selectedMethod,
        voucherId: appliedVoucher ? appliedVoucher.id : null,
        addressId: addressId,
        orderDetails: orderDetails,
      };

      // Gọi createOrder
      const response = await createOrder(orderRequest);

      // Lấy dữ liệu đơn hàng từ phản hồi
      const orderData = response.response;

      const addressData = orderData.address;
      const formattedAddress = addressData
        ? `${addressData.detailLocation}, ${addressData.street}, ${addressData.district}, ${addressData.city}`
        : "Address not available";

      const deliveryInfo = getEstimatedDeliveryDate(orderData);

      const customerNoteInfo = sessionStorage.getItem("orderInfo")
        ? JSON.parse(sessionStorage.getItem("orderInfo"))
        : null;

      const orderCompleteData = {
        orderNumber: `GN-${orderData.id}-${uuidv4().substring(0, 8)}`,
        totalAmount: formatCurrency(totalAmount),
        deliveryAddress: formattedAddress,
        deliveryDate: deliveryInfo.date,
        deliveryTime: deliveryInfo.timeWindow,
        customerNote: customerNoteInfo
          ? customerNoteInfo.note
          : "Không có ghi chú",
      };

      // Xóa dữ liệu giỏ hàng và thông tin đơn hàng khỏi sessionStorage
      sessionStorage.removeItem("cartData");
      sessionStorage.removeItem("orderInfo");

      alert("Đặt hàng thành công!");
      navigate("/order-complete", {
        state: {
          orderInfo: orderCompleteData,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Đặt hàng thất bại! Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm tính toán ngày giao hàng dự kiến
  const getEstimatedDeliveryDate = (orderData) => {
    // Lấy ngày tạo đơn hàng từ dữ liệu đơn hàng
    const createdDate = orderData?.createdAt
      ? new Date(orderData.createdAt)
      : new Date();

    // Thêm thời gian giao hàng - từ 3-5 ngày kể từ khi tạo đơn hàng
    const deliveryDate = new Date(createdDate);
    const deliveryDays = 3 + Math.floor(Math.random() * 3); // 3-5 ngày
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    // Tạo khung giờ giao hàng ngẫu nhiên
    const timeSlots = [
      "8:00 - 12:00",
      "9:00 - 12:00",
      "13:00 - 17:00",
      "14:00 - 18:00",
    ];

    // Chọn một khung giờ ngẫu nhiên từ danh sách
    const randomTimeSlot =
      timeSlots[Math.floor(Math.random() * timeSlots.length)];

    // Định dạng ngày giao hàng theo định dạng Việt Nam
    const formattedDate = deliveryDate.toLocaleDateString("vi-VN");

    return {
      date: formattedDate,
      timeWindow: randomTimeSlot,
    };
  };

  if (!cartData) {
    return <div>Loading...</div>;
  }

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

        <div className="OrderPayment__container">
          <CheckoutStepper currentStep={2} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="OrderPayment__section"
          >
            <div className="OrderPayment__title">Phương thức thanh toán</div>

            <div className="OrderPayment__method">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedMethod === "cod"}
                  onChange={() => setSelectedMethod("cod")}
                />
                Thanh toán khi nhận hàng (COD)
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={selectedMethod === "bank"}
                  onChange={() => setSelectedMethod("bank")}
                />
                Chuyển khoản ngân hàng
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={selectedMethod === "paypal"}
                  onChange={() => setSelectedMethod("paypal")}
                />
                Thanh toán qua PayPal
              </label>
            </div>

            {selectedMethod === "bank" && (
              <>
                <div className="OrderPayment__bankInfo">
                  <p>
                    <strong>Ngân hàng:</strong> Techcombank (TCB)
                  </p>
                  <p>
                    <strong>Số tài khoản:</strong> 0123456789
                  </p>
                  <p>
                    <strong>Chủ tài khoản:</strong> Công ty TNHH 4 CON ĐẾ
                  </p>
                </div>

                <BankQR amount={totalAmount} orderCode={orderCode} />
              </>
            )}

            <div className="OrderPayment__summary">
              <div className="OrderPayment__row">
                <span>Tạm tính:</span>
                <span className="OrderInfoForm__totalPrice">
                  {cartData ? formatCurrency(cartData.totalPrice) : "0đ"}
                </span>
              </div>
              <div className="OrderPayment__row">
                <span>Phí vận chuyển:</span>
                <span>{formatCurrency(19000)}</span>
              </div>
              <div className="OrderPayment__total">
                <strong>Tổng cộng:</strong>
                <strong>{cartData ? formatCurrency(totalAmount) : "0đ"}</strong>
              </div>
            </div>

            {selectedMethod === "paypal" ? (
              <PayPalButton
                amount={totalAmount.toFixed(2)} // Ensure the amount is correctly formatted for PayPal
                onSuccess={(details) => {
                  toast.success(
                    `Thanh toán thành công bởi ${details.payer.name.given_name}`,
                    {
                      position: "top-center",
                      autoClose: 2000,
                      onClose: () => navigate("/order-complete"),
                    }
                  );
                }}
              />
            ) : (
              <button
                className="OrderPayment__submitBtn"
                onClick={handleCreateOrder}
              >
                XÁC NHẬN THANH TOÁN
              </button>
            )}
          </motion.div>
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

export default OrderPayment;

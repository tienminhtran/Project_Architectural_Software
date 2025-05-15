import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import CheckoutStepper from "./CheckoutStepper";
import { useNavigate } from "react-router-dom";
import "../../assets/css/OrderInfoForm.css";
import DeliveryWithGeolocation from "./DeliveryWithGeolocation";
import HeaderUserBasic from "../../components/layout/HeaderUserBasic";
import FooterUser from "../../components/layout/Footer";
import ModalAddress from "./ModalAddress";
import AddressBookModal from "../../../src/pages/common/user/AddressBookModal";
import useUser from "../../hooks/useUser";
import { formatPrice } from "../../utils/FormatPrice";

const OrderInfoForm = ({ userid }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [invoice, setInvoice] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  // Lấy thông tin người dùng
  const { userInfor } = useUser(0, 1);
  const user = useMemo(() => userInfor || null, [userInfor]);

  console.log("userInfor--------", userInfor);
  console.log("user-----------------------------", user);
  // Lấy thông tin giỏ hàng từ sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem("cartData");
    if (storedData) {
      setCartData(JSON.parse(storedData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Cập nhật thông tin người dùng khi có thay đổi
  useEffect(() => {
    if (user) {
      setName(`${user.firstname} ${user.lastname}`);
      setPhone(user.phone_number);
    }
  }, [user]);

  // Kiểm tra tính hợp lệ của form
  const validateForm = () => {
    if (!name.trim()) {
      alert("Vui lòng nhập họ tên.");
      return false;
    }
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("Vui lòng nhập số điện thoại hợp lệ.");
      return false;
    }
    if (!selectedAddress) {
      alert("Vui lòng chọn địa chỉ giao hàng.");
      return false;
    }
    return true;
  };

  // Xử lý khi người dùng nhấn nút "Thanh toán"
  const handleSubmit = () => {
    if (validateForm()) {
      const orderInfo = {
        name,
        phone,
        note,
        invoice,
        address: selectedAddress.address,
      };
      console.log("User ID:", user.id);
      console.log("Selected Address:", selectedAddress);
      sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
      navigate("/order-payment", {
        state: {
          userId: user.id,
          addressId: selectedAddress.id,
        },
      });
    }
  };

  // Nếu giỏ hàng chưa có dữ liệu, hiển thị thông báo loading
  if (!cartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderUserBasic />
      <div style={{ display: "flex" }}>
        <div>
          <img
            src="/images/bg/thu-cu-doi-moi.png"
            alt="Banner trái"
            className="CartBuy-OrderBox__logo"
            style={{ width: "160px" }}
          />
        </div>

        <div className="OrderInfoForm__container">
          <CheckoutStepper currentStep={1} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="OrderInfoForm__section"
          >
            <div className="OrderInfoForm__title">Thông tin khách mua hàng</div>

            <div className="OrderInfoForm__row">
              <input
                type="text"
                placeholder="Nhập họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly
              />
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly
              />
            </div>

            <div className="OrderInfoForm__row">
              <button
                type="button"
                className="OrderInfoForm__selectAddressBtn"
                onClick={() => setShowAddressModal(true)}
              >
                Chọn địa chỉ giao hàng
              </button>
              {selectedAddress && (
                <p>
                  Địa chỉ đã chọn: <strong>{selectedAddress.address}</strong>
                </p>
              )}
            </div>

            <textarea
              placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="OrderInfoForm__row">
              <label>
                <input
                  type="checkbox"
                  checked={invoice}
                  onChange={(e) => setInvoice(e.target.checked)}
                />{" "}
                Xuất hoá đơn cho đơn hàng
              </label>
            </div>

            <div className="OrderInfoForm__totalRow">
              <span>Tổng tiền:</span>
              <span className="OrderInfoForm__totalPrice">
                {formatPrice(cartData.totalPrice)}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="OrderInfoForm__submitBtn"
              onClick={handleSubmit}
            >
              THANH TOÁN
            </motion.button>
          </motion.div>
        </div>

        <div>
          <img
            src="/images/bg/mua-he-ruc-ro.png"
            alt="Banner phải"
            className="CartBuy-OrderBox__logo"
            style={{ width: "160px" }}
          />
        </div>
      </div>

      {/* Modal địa chỉ */}
      <ModalAddress
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSelect={(address) => setSelectedAddress(address)}
        userId={user?.id} // Truyền ID người dùng vào modal
      />

      <FooterUser />
    </div>
  );
};

export default OrderInfoForm;

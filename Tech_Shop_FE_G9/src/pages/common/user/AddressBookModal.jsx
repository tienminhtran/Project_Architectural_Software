import React, { useState, useEffect } from "react";
import "../../../assets/css/AddressBookModal.css";
import useAddress from "../../../hooks/useAddress"; // Import the useAddress hook

const AddressBookModal = ({ user, newAddress, setNewAddress, onClose }) => {
  const [errors, setErrors] = useState({ city: "", district: "", street: "" });

  const { getAddress, addAddress } = useAddress(); // Destructure the functions from the hook

  const cityList = ["TP.HCM", "Hà Nội", "Đà Nẵng"];
  const districtList = {
    "TP.HCM": ["Quận 1", "Quận 3", "Quận 5"],
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Đống Đa"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Ngũ Hành Sơn"],
  };

  const streetList = {
    "Quận 1": ["Nguyễn Huệ", "Lê Lợi"],
    "Quận 3": ["Cách Mạng Tháng 8", "Pasteur"],
    "Quận 5": ["Trần Hưng Đạo", "Châu Văn Liêm"],
    "Ba Đình": ["Kim Mã", "Liễu Giai"],
    "Hoàn Kiếm": ["Hàng Bài", "Đinh Tiên Hoàng"],
    "Đống Đa": ["Xã Đàn", "Tôn Đức Thắng"],
    "Hải Châu": ["Bạch Đằng", "Trần Phú"],
    "Thanh Khê": ["Điện Biên Phủ", "Hà Huy Tập"],
    "Ngũ Hành Sơn": ["Lê Văn Hiến", "Nguyễn Văn Thoại"],
  };

  const districts = districtList[newAddress.city] || [];
  const streets = streetList[newAddress.district] || [];

  const handleSave = async () => {
    const newErrors = {
      city: newAddress.city ? "" : "Vui lòng chọn thành phố",
      district: newAddress.district ? "" : "Vui lòng chọn quận/huyện",
      street: newAddress.street ? "" : "Vui lòng chọn đường",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (!hasError) {
      try {
        await addAddress({ userId: user.id, ...newAddress });
        onClose(); // Close the modal after successfully adding the address
      } catch (error) {
        console.error("Lỗi khi lưu địa chỉ:", error);
        alert("Thêm địa chỉ thất bại.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="address-book-modal">
        <h3>Thêm địa chỉ mới</h3>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Họ tên:</strong> {user.firstname} {user.lastname}</p>
        <p><strong>SĐT:</strong> {user.phone_number}</p>

        <label>Thành phố:</label>
        <select
          value={newAddress.city}
          onChange={(e) =>
            setNewAddress({ ...newAddress, city: e.target.value, district: "", street: "" })
          }
        >
          <option value="">-- Chọn thành phố --</option>
          {cityList.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="error-message">{errors.city}</p>}

        <label>Quận/Huyện:</label>
        <select
          value={newAddress.district}
          onChange={(e) =>
            setNewAddress({ ...newAddress, district: e.target.value, street: "" })
          }
          disabled={!newAddress.city}
        >
          <option value="">-- Chọn quận/huyện --</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {errors.district && <p className="error-message">{errors.district}</p>}

        <label>Đường:</label>
        <select
          value={newAddress.street}
          onChange={(e) =>
            setNewAddress({ ...newAddress, street: e.target.value })
          }
          disabled={!newAddress.district}
        >
          <option value="">-- Chọn đường --</option>
          {streets.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.street && <p className="error-message">{errors.street}</p>}

        <div className="modal-buttons">
          <button onClick={handleSave}>Lưu</button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default AddressBookModal;

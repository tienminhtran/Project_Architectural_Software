import React, { useEffect, useState } from "react";
import "../../../assets/css/AddressBookModal.css";
import useAddress from "../../../hooks/useAddress";
import dvhcvn from "../../../json/dvhcvn.json"; 

const AddressBookModal = ({ user, newAddress, setNewAddress, onClose }) => {
  const [errors, setErrors] = useState({ city: "", district: "", street: "", detailLocation: "" });
  const { addAddress } = useAddress();

  const [rawData, setRawData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);

  useEffect(() => {
    setRawData(dvhcvn.data || []);
  }, []);

  useEffect(() => {
    const city = rawData.find(c => c.name === newAddress.city);
    setDistricts(city ? city.level2s : []);
    setNewAddress(prev => ({ ...prev, district: "", street: "" }));
  }, [newAddress.city]);

  useEffect(() => {
    const city = rawData.find(c => c.name === newAddress.city);
    const district = city?.level2s.find(d => d.name === newAddress.district);
    setStreets(district ? district.level3s.map(l3 => l3.name) : []);
    setNewAddress(prev => ({ ...prev, street: "" }));
  }, [newAddress.district]);

  const handleSave = async () => {
    const newErrors = {
      city: newAddress.city ? "" : "Vui lòng chọn thành phố",
      district: newAddress.district ? "" : "Vui lòng chọn quận/huyện",
      street: newAddress.street ? "" : "Vui lòng chọn phường/xã",
      detailLocation: newAddress.detailLocation ? "" : "Vui lòng nhập địa chỉ chi tiết",
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(err => err !== "")) {
      try {
        await addAddress({ userId: user.id, ...newAddress });
        onClose();
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
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        >
          <option value="">-- Chọn thành phố --</option>
          {rawData.map((city) => (
            <option key={city.level1_id} value={city.name}>{city.name}</option>
          ))}
        </select>
        {errors.city && <p className="error-message">{errors.city}</p>}

        <label>Quận/Huyện:</label>
        <select
          value={newAddress.district}
          onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
          disabled={!districts.length}
        >
          <option value="">-- Chọn quận/huyện --</option>
          {districts.map((d) => (
            <option key={d.level2_id} value={d.name}>{d.name}</option>
          ))}
        </select>
        {errors.district && <p className="error-message">{errors.district}</p>}

        <label>Phường/Xã:</label>
        <select
          value={newAddress.street}
          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
          disabled={!streets.length}
        >
          <option value="">-- Chọn phường/xã --</option>
          {streets.map((s, index) => (
            <option key={index} value={s}>{s}</option>
          ))}
        </select>
        {errors.street && <p className="error-message">{errors.street}</p>}

        <label>Địa chỉ chi tiết:</label>
        <input
          type="text"
          value={newAddress.detailLocation}
          onChange={(e) => setNewAddress({ ...newAddress, detailLocation: e.target.value })}
        />
        {errors.detailLocation && <p className="error-message">{errors.detailLocation}</p>}

        <div className="modal-buttons">
          <button onClick={handleSave}>Lưu</button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default AddressBookModal;

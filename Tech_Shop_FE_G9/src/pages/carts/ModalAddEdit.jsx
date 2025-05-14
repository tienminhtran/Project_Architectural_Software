import React, { useEffect, useState } from "react";
import "../../assets/css/ModalAddEdit.css";
import useAddress from "../../hooks/useAddress";
import dvhcvn from "../../json/dvhcvn.json";
import DeliveryWithGeolocation from "./DeliveryWithGeolocation";

const ModalAddEdit = ({ userId, onClose, address }) => {
  const [errors, setErrors] = useState({
    city: "",
    district: "",
    street: "",
    detailLocation: "",
  });
  const { addAddress, updateAddress } = useAddress(); // Assume updateAddress is available
  const [newAddress, setNewAddress] = useState({
    city: "",
    district: "",
    street: "",
    detailLocation: "",
  });
  const [rawData, setRawData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);
  const [showGeolocation, setShowGeolocation] = useState(false);

  useEffect(() => {
    setRawData(dvhcvn.data || []);
  }, []);

  // Pre-populate fields if editing an address
  useEffect(() => {
    if (address) {
      setNewAddress({
        city: address.city || "",
        district: address.district || "",
        street: address.street || "",
        detailLocation: address.detailLocation || "",
      });
    }
  }, [address]);

  useEffect(() => {
    const city = rawData.find((c) => c.name === newAddress.city);
    setDistricts(city ? city.level2s : []);
    if (!city) {
      setNewAddress((prev) => ({ ...prev, district: "", street: "" }));
    }
  }, [newAddress.city, rawData]);

  useEffect(() => {
    const city = rawData.find((c) => c.name === newAddress.city);
    const district = city?.level2s.find((d) => d.name === newAddress.district);
    setStreets(district ? district.level3s.map((l3) => l3.name) : []);
    if (!district) {
      setNewAddress((prev) => ({ ...prev, street: "" }));
    }
  }, [newAddress.district, rawData]);

  const handleSave = async () => {
    const newErrors = {
      city: newAddress.city ? "" : "Vui lòng chọn thành phố",
      district: newAddress.district ? "" : "Vui lòng chọn quận/huyện",
      street: newAddress.street ? "" : "Vui lòng chọn phường/xã",
      detailLocation: newAddress.detailLocation ? "" : "Vui lòng nhập địa chỉ chi tiết",
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some((err) => err !== "")) {
      try {
        if (address && address.id) {
          // Update existing address
          await updateAddress({ id: address.id, userId, ...newAddress });
        } else {
          // Add new address
          await addAddress({ userId, ...newAddress });
        }
        onClose();
      } catch (error) {
        console.error("Lỗi khi lưu địa chỉ:", error);
        alert("Lưu địa chỉ thất bại.");
      }
    }
  };

  const handleAddressSelect = (selectedAddress) => {
    const addressParts = selectedAddress.split(", ");
    let city = "";
    let district = "";
    let street = "";
    let detailLocation = "";

    if (addressParts.length >= 4) {
      city = addressParts[addressParts.length - 2];
      district = addressParts[addressParts.length - 3];
      street = addressParts[addressParts.length - 4];
      detailLocation = addressParts.slice(0, addressParts.length - 4).join(", ");
    }

    const cityMatch = rawData.find((c) => c.name.includes(city));
    if (cityMatch) {
      city = cityMatch.name;
      const districtMatch = cityMatch.level2s.find((d) => d.name.includes(district));
      if (districtMatch) {
        district = districtMatch.name;
        const streetMatch = districtMatch.level3s.find((s) => s.name.includes(street));
        if (streetMatch) {
          street = streetMatch.name;
        } else {
          street = "";
        }
      } else {
        district = "";
      }
    } else {
      city = "";
    }

    setNewAddress({
      city,
      district,
      street,
      detailLocation,
    });
    setShowGeolocation(false);
  };

  return (
    <div className="modal-overlay">
      {showGeolocation ? (
        <DeliveryWithGeolocation
          onClose={() => setShowGeolocation(false)}
          onSelectAddress={handleAddressSelect}
        />
      ) : (
        <div className="Modal-Add-Edit">
          <h3>{address ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</h3>
          <ul type="none" className="list-quick">
            <li>
              <button
                className="btn-modern add-address"
                onClick={() => setShowGeolocation(true)}
              >
                <span>Chọn nhanh từ bản đồ</span>
              </button>
            </li>
          </ul>

          <div className="form-group">
            <label>Thành phố:</label>
            <select
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            >
              <option value="">-- Chọn thành phố --</option>
              {rawData.map((city) => (
                <option key={city.level1_id} value={city.name}>
                  {city.name}
                </option>
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
                <option key={d.level2_id} value={d.name}>
                  {d.name}
                </option>
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
                <option key={index} value={s}>
                  {s}
                </option>
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
          </div>

          <div className="modal-buttons">
            <button onClick={handleSave}>Lưu</button>
            <button onClick={onClose}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalAddEdit;
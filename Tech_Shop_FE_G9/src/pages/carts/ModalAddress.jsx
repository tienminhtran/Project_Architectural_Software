import React, { useState, useEffect } from "react";
import "../../../src/assets/css/ModalAddress.css";
import { FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";
import { getAddressById } from "../../services/addressService";

const ModalAddress = ({ isOpen, onClose, onSelect, userId }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [addressData, setAddressData] = useState([]); // State for storing fetched addresses

  useEffect(() => {
    if (isOpen && userId) {
      const fetchAddresses = async () => {
        try {
          const data = await getAddressById(userId); // Fetch addresses from API
          setAddressData(data.response); // Assuming the response format is like your example
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };

      fetchAddresses();
    }
  }, [isOpen, userId]); // Re-run when modal opens or userId changes

  const formatAddress = (address) =>
    `${address.detailLocation}, ${address.street}, ${address.district}, ${address.city}`;

  const handleConfirm = () => {
    const selected = addressData.find((addr) => addr.id === selectedId);
    if (selected) {
      onSelect({
        id: selected.id,
        address: formatAddress(selected),
      });
      onClose();
    }
  };

  const handleEdit = (address) => {
    alert(`Chỉnh sửa địa chỉ ID ${address.id} chưa được hỗ trợ.`);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header-modern">
          <h2 className="modal-title">
            <FaMapMarkerAlt /> Chọn địa chỉ giao hàng
          </h2>
          <h6> ID: {userId}</h6>
          <button
            className="btn-modern add-address"
            onClick={() => alert("Thêm địa chỉ mới chưa được hỗ trợ.")}
          >
            <FaPlusCircle className="icon-plus" />
            Thêm địa chỉ mới
          </button>
        </div>
        <div className="address-list-modern">
          {addressData.length > 0 ? (
            addressData.map((addr) => (
              <div
                key={addr.id}
                className={`address-card ${
                  selectedId === addr.id ? "selected" : ""
                }`}
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedId === addr.id}
                    onChange={() => setSelectedId(addr.id)}
                  />
                  <span className="custom-checkbox" />
                </label>
                <div className="address-info">
                  <div className="address-text">{formatAddress(addr)}</div>
                </div>
                <button className="edit-btn" onClick={() => handleEdit(addr)}>
                  Sửa
                </button>
              </div>
            ))
          ) : (
            <div>Không có địa chỉ nào</div>
          )}
        </div>
        <div className="modal-actions">
          <button
            className="btn confirm"
            disabled={!selectedId}
            onClick={handleConfirm}
          >
            Xác nhận
          </button>
          <button className="btn cancel" onClick={onClose}>
            ❌ Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddress;

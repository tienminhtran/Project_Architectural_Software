import React, { useState, useEffect } from "react";
import "../../../src/assets/css/ModalAddress.css";
import { FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";
import { getAddressById } from "../../services/addressService";
import ModalAddEdit from "./ModalAddEdit"; // Assuming this is the correct path

const ModalAddress = ({ isOpen, onClose, onSelect, userId }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const [isModalAddEditOpen, setIsModalAddEditOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null); // State to track address being edited

  useEffect(() => {
    if (isOpen && userId) {
      const fetchAddresses = async () => {
        try {
          const data = await getAddressById(userId);
          setAddressData(data.response);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      fetchAddresses();
    }
  }, [isOpen, userId]);

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

  const handleAddNewAddress = () => {
    setEditAddress(null); // Clear editAddress for adding new address
    setIsModalAddEditOpen(true);
  };

  const handleEdit = (address) => {
    setEditAddress(address); // Set the address to edit
    setIsModalAddEditOpen(true); // Open ModalAddEdit
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header-modern">
          <h2 className="modal-title">
            <FaMapMarkerAlt /> Chọn địa chỉ giao hàng
          </h2>
          <h6>ID: {userId}</h6>
          <button className="btn-modern add-address" onClick={handleAddNewAddress}>
            <FaPlusCircle className="icon-plus" />
            Thêm địa chỉ
          </button>
        </div>
        <div className="address-list-modern">
          {addressData.length > 0 ? (
            addressData.map((addr) => (
              <div
                key={addr.id}
                className={`address-card ${selectedId === addr.id ? "selected" : ""}`}
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
          <button className="btn confirm" disabled={!selectedId} onClick={handleConfirm}>
            Xác nhận
          </button>
          <button className="btn cancel" onClick={onClose}>
            ❌ Đóng
          </button>
        </div>
      </div>
      {isModalAddEditOpen && (
        <ModalAddEdit
          userId={userId}
          address={editAddress} // Pass address for editing
          onClose={() => {
            setIsModalAddEditOpen(false);
            setEditAddress(null); // Clear editAddress when closing
          }}
        />
      )}
    </div>
  );
};

export default ModalAddress;
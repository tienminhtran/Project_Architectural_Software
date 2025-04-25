import React, { useState } from "react"; 
import "../../../assets/css/AddressBook.css";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "tien tot",
      phone: "0123456789",
      address: "123 Đường A, TP.HCM",
      isDefault: true,
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      phone: "0987654321",
      address: "456 Đường B, Hà Nội",
      isDefault: false,
    },
  ]);

  const [editingAddress, setEditingAddress] = useState(null);

  const handleEditClick = (address) => {
    setEditingAddress(address);
  };

  const handleInputChange = (e, field) => {
    setEditingAddress({
      ...editingAddress,
      [field]: e.target.value,
    });
  };

  const handleSave = () => {
    setAddresses(addresses.map((address) =>
      address.id === editingAddress.id ? editingAddress : address
    ));
    setEditingAddress(null);
  };

  return (
    <div className="address-book__page">
      <h2>Sổ địa chỉ</h2>
      <button className="address-book__btn-add">+ Thêm địa chỉ</button>
      <div className="address-book__list">
        {addresses.map((addr) => (
          <div className={`address-book__card ${addr.isDefault ? "address-book__default" : ""}`} key={addr.id}>
            {editingAddress?.id === addr.id ? (
              <div>
                <label>Họ tên:</label>
                <input
                  type="text"
                  value={editingAddress.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
                <label>SĐT:</label>
                <input
                  type="text"
                  value={editingAddress.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                />
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  value={editingAddress.address}
                  onChange={(e) => handleInputChange(e, "address")}
                />
                <button className="address-book__btn-save" onClick={handleSave}>Lưu</button>
              </div>
            ) : (
              <div>
                <p><strong>Họ tên:</strong> {addr.name}</p>
                <p><strong>SĐT:</strong> {addr.phone}</p>
                <p><strong>Địa chỉ:</strong> {addr.address}</p>
                {addr.isDefault && <span className="address-book__badge">Mặc định</span>}
                <button className="address-book__btn-update" onClick={() => handleEditClick(addr)}>Cập nhật</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;

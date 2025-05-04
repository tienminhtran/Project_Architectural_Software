import React, { useState, useMemo, useEffect } from "react";
import "../../../assets/css/AddressBook.css";
import useUser from "../../../hooks/useUser";
import AddressBookModal from "./AddressBookModal";
import useAddress from "../../../hooks/useAddress";

const AddressBook = () => {
  const { userInfor } = useUser(0, 1);
  const user = useMemo(() => userInfor || null, [userInfor]);

  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    city: "",
    district: "",
    street: "",
    detailLocation: "",
  });

  const { getAddress } = useAddress();

  // Load addresses when user is available
  useEffect(() => {
    if (user?.id) {
      getAddress(user.id)
        .then((res) => {
          if (res?.status === "SUCCESS") {
            const formatted = res.response.map((addr, index) => ({
              ...addr,
              name: `${user.firstname} ${user.lastname}`,
              phone: user.phone_number,
              isDefault: index === 0,
            }));
            setAddresses(formatted);
          }
        })
        .catch((err) => console.error("Không lấy được địa chỉ:", err));
    }
  }, [user]);

  const handleEditClick = (address) => {
    setEditingAddress({ ...address });
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

  const handleAddAddress = () => {
    const fullName = `${user.firstname} ${user.lastname}`;
    const newAddr = {
      id: Date.now(),
      name: fullName,
      phone: user.phone_number,
      ...newAddress,
      isDefault: false,
    };
    setAddresses([...addresses, newAddr]);
    setShowModal(false);
    setNewAddress({ city: "", district: "", street: "", detailLocation: "" });
  };

  const formatFullAddress = (addr) => {
    return `${addr.detailLocation}, ${addr.street}, ${addr.district}, ${addr.city}`;
  };

  const fullName = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();

  // This function will be called when the modal is closed after adding an address
  const handleModalClose = () => {
    setShowModal(false);
    if (user?.id) {
      // Reload the address list after successfully adding a new one
      getAddress(user.id)
        .then((res) => {
          if (res?.status === "SUCCESS") {
            const formatted = res.response.map((addr, index) => ({
              ...addr,
              name: `${user.firstname} ${user.lastname}`,
              phone: user.phone_number,
              isDefault: index === 0,
            }));
            setAddresses(formatted);
          }
        })
        .catch((err) => console.error("Không lấy được địa chỉ:", err));
    }
  };

  return (
    <div className="address-book__page">
      <h2 style={{justifyContent:"space-between", display:"flex"}}>
        <div>Sổ địa chỉ </div>
        <button className="address-book__btn-add" onClick={() => setShowModal(true)}>+ Thêm địa chỉ</button>
      </h2>

      {showModal && user && (
        <AddressBookModal
          user={user}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          onSave={handleAddAddress}
          onClose={handleModalClose} // Close the modal and reload the address list
        />
      )}

      <div className="address-book__list">
        {addresses.map((addr) => (
          <div
            className={`address-book__card ${addr.isDefault ? "address-book__default" : ""}`}
            key={addr.id}
          >
            {editingAddress?.id === addr.id ? (
              <div>
                <label>Chi tiết:</label>
                <input type="text" value={editingAddress.detailLocation} onChange={(e) => handleInputChange(e, "detailLocation")} />

                <label>Đường:</label>
                <input type="text" value={editingAddress.street} onChange={(e) => handleInputChange(e, "street")} />

                <label>Quận/Huyện:</label>
                <input type="text" value={editingAddress.district} onChange={(e) => handleInputChange(e, "district")} />

                <label>Thành phố:</label>
                <input type="text" value={editingAddress.city} onChange={(e) => handleInputChange(e, "city")} />

                <button className="address-book__btn-save" onClick={handleSave}>Lưu</button>
              </div>
            ) : (
              <div>
                <p><strong>Họ tên:</strong> {fullName}</p>
                <p><strong>SĐT:</strong> {addr.phone}</p>
                <p><strong>Địa chỉ:</strong> {formatFullAddress(addr)}</p>
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

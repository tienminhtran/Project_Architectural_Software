import React, { useState, useMemo, useEffect } from "react";
import "../../../assets/css/AddressBook.css";
import useUser from "../../../hooks/useUser";
import AddressBookModal from "./AddressBookModal";
import useAddress from "../../../hooks/useAddress";
import { FaEllipsisV } from "react-icons/fa";

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
  const [menuVisible, setMenuVisible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getAddress, addAddress, updateStatus, updateAddress } = useAddress();

  // Load addresses when user is available
  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      getAddress(user.id)
        .then((res) => {
          if (res?.status === "SUCCESS") {
            console.log("API Response for addresses:", res.response); // Log raw response
            const formatted = res.response.map((addr, index) => {
              if (!addr.id) {
                console.warn("Address missing ID:", addr);
              }
              return {
                ...addr,
                id: addr.id || `temp-${index}`, // Fallback ID if missing
                name: `${user.firstname} ${user.lastname}`,
                phone: user.phone_number,
                isDefault: index === 0,
              };
            });
            setAddresses(formatted);
          }
        })
        .catch((err) => console.error("Không lấy được địa chỉ:", err))
        .finally(() => setIsLoading(false));
    }
  }, [user, getAddress]);

  const handleEditClick = (address) => {
    if (!address.id) {
      console.error("Cannot edit address with undefined ID:", address);
      alert("Địa chỉ không hợp lệ để chỉnh sửa.");
      return;
    }
    setEditingAddress({
      ...address,
      city: address.city || "",
      district: address.district || "",
      street: address.street || "",
      detailLocation: address.detailLocation || "",
    });
    setMenuVisible(null);
  };

  const handleInputChange = (e, field) => {
    setEditingAddress({
      ...editingAddress,
      [field]: e.target.value,
    });
  };

  const handleSave = async (idAdd) => {
    if (!idAdd || isNaN(idAdd)) {
      console.error("Invalid address ID:", idAdd);
      alert("ID địa chỉ không hợp lệ.");
      return;
    }

    const payload = {
      city: editingAddress.city?.trim(),
      district: editingAddress.district?.trim(),
      street: editingAddress.street?.trim(),
      detailLocation: editingAddress.detailLocation?.trim(),
    };

    if (!payload.city || !payload.district || !payload.street || !payload.detailLocation) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Updating address with ID:", idAdd, "Payload:", payload);
      const res = await updateAddress(idAdd, payload);
      console.log("Response from updateAddress:", res);
      if (res?.status === "SUCCESS") {
        setAddresses(
          addresses.map((address) =>
            address.id === idAdd ? { ...editingAddress, id: idAdd } : address
          )
        );
        setEditingAddress(null);
        alert("Cập nhật địa chỉ thành công!");
      } else {
        alert(`Không thể cập nhật địa chỉ: ${res?.message || "Lỗi không xác định"}`);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật địa chỉ:", err.response?.data || err.message);
      alert(`Cập nhật địa chỉ thất bại: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async () => {
    const payload = {
      userId: user.id,
      city: newAddress.city?.trim(),
      district: newAddress.district?.trim(),
      street: newAddress.street?.trim(),
      detailLocation: newAddress.detailLocation?.trim(),
    };
    if (!payload.city || !payload.district || !payload.street || !payload.detailLocation) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await addAddress(payload);
      if (res?.status === "SUCCESS") {
        const fullName = `${user.firstname} ${user.lastname}`;
        const newAddr = {
          id: res.response.id,
          name: fullName,
          phone: user.phone_number,
          ...newAddress,
          isDefault: addresses.length === 0,
        };
        setAddresses([...addresses, newAddr]);
        setShowModal(false);
        setNewAddress({ city: "", district: "", street: "", detailLocation: "" });
        alert("Thêm địa chỉ thành công!");
      } else {
        alert(`Không thể thêm địa chỉ: ${res?.message || "Lỗi không xác định"}`);
      }
    } catch (err) {
      console.error("Lỗi khi thêm địa chỉ:", err.response?.data || err.message);
      alert(`Thêm địa chỉ thất bại: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!id) {
      console.error("Cannot delete address with undefined ID:", id);
      alert("ID địa chỉ không hợp lệ để xóa.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await updateStatus(id);
      if (res?.status === "SUCCESS") {
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
        alert("Xóa địa chỉ thành công!");
      } else {
        alert(`Không thể xóa địa chỉ: ${res?.message || "Lỗi không xác định"}`);
      }
    } catch (err) {
      console.error("Lỗi khi xóa địa chỉ:", err.response?.data || err.message);
      alert(`Xóa địa chỉ thất bại: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
      setMenuVisible(null);
    }
  };

  const toggleMenu = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const formatFullAddress = (addr) => {
    return `${addr.detailLocation}, ${addr.street}, ${addr.district}, ${addr.city}`;
  };

  const fullName = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();

  const handleModalClose = () => {
    setShowModal(false);
    if (user?.id) {
      setIsLoading(true);
      getAddress(user.id)
        .then((res) => {
          if (res?.status === "SUCCESS") {
            const formatted = res.response.map((addr, index) => ({
              ...addr,
              id: addr.id || `temp-${index}`, // Fallback ID
              name: `${user.firstname} ${user.lastname}`,
              phone: user.phone_number,
              isDefault: index === 0,
            }));
            setAddresses(formatted);
          }
        })
        .catch((err) => console.error("Không lấy được địa chỉ:", err))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="address-book__page">
      <h2 style={{ justifyContent: "space-between", display: "flex" }}>
        <div>Sổ địa chỉ</div>
        <button
          className="address-book__btn-add"
          onClick={() => setShowModal(true)}
          disabled={isLoading}
        >
          + Thêm địa chỉ
        </button>
      </h2>

      {showModal && user && (
        <AddressBookModal
          user={user}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          onSave={handleAddAddress}
          onClose={handleModalClose}
        />
      )}

      {isLoading && <div>Đang tải...</div>}

      <div className="address-book__list">
        {addresses.map((addr) => (
          <div
            className={`address-book__card ${
              addr.isDefault ? "address-book__default" : ""
            }`}
            key={addr.id}
          >
            {editingAddress?.id === addr.id ? (
              <div>
                <label>Chi tiết:</label>
                <input
                  type="text"
                  value={editingAddress.detailLocation}
                  onChange={(e) => handleInputChange(e, "detailLocation")}
                />
                <label>Đường:</label>
                <input
                  type="text"
                  value={editingAddress.street}
                  onChange={(e) => handleInputChange(e, "street")}
                />
                <label>Quận/Huyện:</label>
                <input
                  type="text"
                  value={editingAddress.district}
                  onChange={(e) => handleInputChange(e, "district")}
                />
                <label>Thành phố:</label>
                <input
                  type="text"
                  value={editingAddress.city}
                  onChange={(e) => handleInputChange(e, "city")}
                />
                <button
                  className="address-book__btn-save"
                  onClick={() => handleSave(addr.id)}
                  disabled={isLoading}
                >
                  Lưu
                </button>
              </div>
            ) : (
              <div>
                <p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {/* <div style={{ display: "flex", alignItems: "center" }}>
                      <strong>Địa chỉ {addr.id}:</strong>
                      {addr.isDefault && (
                        <span className="address-book__badge">Mặc định</span>
                      )}
                    </div> */}
                    <div>
                      <strong>Họ tên:</strong> {fullName}
                    </div>
                    <div style={{ position: "relative" }}>
                      <FaEllipsisV
                        size={16}
                        color="#101E35"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleMenu(addr.id)}
                      />
                      {menuVisible === addr.id && (
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 20,
                            background: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            zIndex: 1000,
                            color: "#101E35",
                          }}
                        >
                          <button
                            style={{
                              display: "block",
                              padding: "8px 16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              width: "100%",
                              textAlign: "left",
                              color: "#101E35",
                            }}
                            onClick={() => handleEditClick(addr)}
                          >
                            Sửa
                          </button>
                          <button
                            style={{
                              display: "block",
                              padding: "8px 16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              width: "100%",
                              textAlign: "left",
                              color: "red",
                            }}
                            onClick={() => handleDeleteAddress(addr.id)}
                          >
                            Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </p>
                <p>
                  <strong>SĐT:</strong> {addr.phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {formatFullAddress(addr)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressBook;
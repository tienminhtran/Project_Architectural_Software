import React, { useState, useMemo, useRef} from 'react';
import "../../../assets/css/AccountPage.css";
import { FaUser, FaMapMarkerAlt, FaBoxOpen, FaEye, FaSignOutAlt } from 'react-icons/fa';
import AddressBook from "./AddressBook"; // Ensure path is correct
import OrderManagement from "./OrderManagement"; // Ensure path is correct
import StoreLocator from './StoreLocator'; // Ensure path is correct
import Footer from '../../../components/layout/Footer';
import useUser from "../../../hooks/useUser";
import HeaderUser from '../../../components/layout/HeaderUser';
import { CiCamera } from "react-icons/ci";
import Loading from "../../../components/common/Loading";


const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  //select file
  const fileInputRef = useRef(null)
  // const [selectedFiles, setSelectedFiles] = useState(null);


  // lấy thông tin người dùng từ hook useUser
  const { userInfor, updateUser } = useUser(0, 1);
  const user = useMemo(() => {
    return userInfor|| null;
  }, [userInfor]);
  console.log("user", user);

  const [formData, setFormData] = useState({ ...userInfor });
  console.log("Dữ liệu gửi lên:", formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (e) => {
    handleSubmit(e, e.target.files);
  };  

  // Xu ly submit form
  const handleSubmit = async (e, selectedFiles = null) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataUpdate = new FormData();
    //Doi role thanh id
    formData.role = userInfor.role.id;

    //Xoa cac truong khong can thiet
    delete formData.createdAt;
    delete formData.updatedAt;
    delete formData.image;

    console.log("Dữ liệu được chỉnh sửa:", formData);

    // chuyen object thanh json string va append vao formdata
    formDataUpdate.append(
      "user",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    // kiem tra xem co chon file hay khong
    if (selectedFiles) {
      // append file vao formdata
      formDataUpdate.append("fileImage", selectedFiles[0]);
    }


    try {
      await updateUser({ userid: userInfor.id, formData: formDataUpdate }); // Chờ update xong
      setIsEditing(false);
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    } finally {
      setIsLoading(false); // Chỉ tắt loading sau khi xong
    }
  };  

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <>
            <h2>User information</h2>

            <div className="account-page__form-group">
              <label>FirstName</label>
              <input
                type="text"
                disabled={!isEditing}
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>

            <div className="account-page__form-group">
              <label>LastName</label>
              <input
                type="text"
                disabled={!isEditing}
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>

            <div className="account-page__form-group">
              <label>Gender</label>
              <div className="account-page__gender-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    disabled={!isEditing}
                    checked={
                      ["male", "nam", "Male", "Nam"].includes((formData?.gender || "").toLowerCase())
                    }
                    // readOnly={!isEditing}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    disabled={!isEditing}
                    checked={
                      ["female", "nữ", "nu", "Female", "Nữ"].includes((formData?.gender || "").toLowerCase())
                    }
                    // readOnly={!isEditing}
                  />{" "}
                  Female
                </label>
              </div>
            </div>

            <div className="account-page__form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number...."
                disabled={!isEditing}
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="account-page__form-group">
              <label>Email</label>
              <input
                type="email"
                disabled
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="account-page__form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                placeholder="Chọn ngày sinh"
                disabled={!isEditing}
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            {!isEditing ? (
              <button className="" onClick={handleEdit}>
                Update
              </button>
            ) : (
              <>
                <button className="account-page__btn-save me-2" onClick={handleSubmit}>
                  Save
                </button>
                <button className="" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            )}
          </>
        );
      case "address":
        return <AddressBook />;
      case "orders":
        return <OrderManagement />;
      case "store":
        return <StoreLocator />;
      // case "logout":
      //   return <h2>Đăng xuất thành công</h2>;
      default:
        return null;
    }
  };

  return (
    <>

      <div>
        <div>
          <HeaderUser showCategory={false} showBanner={false} />
        </div>    
        
        
          <div className="account-page__container">
          
          <div className="account-page__sidebar">
            <div className="account-page__avatar">
              <div>
                <img src={user?.image || "/images/avatar/avtdefault.jpg"} alt="avatar" onClick={handleImageClick} />
                <h3 className="text-center">{`${user?.firstname || ""} ${user?.lastname || ""}`.trim()}</h3>
              </div>
              {/* <CiCamera size={24} className="ms-3"/> */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
            </div>
            <ul>
              <li onClick={() => setActiveTab("info")} className={activeTab === "info" ? "account-page__active" : ""}>
                <FaUser className="account-page__icon" /> Thông tin tài khoản
              </li>
              <li onClick={() => setActiveTab("address")} className={activeTab === "address" ? "account-page__active" : ""}>
                <FaMapMarkerAlt className="account-page__icon" /> Sổ địa chỉ
              </li>
              <li onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "account-page__active" : ""}>
                <FaBoxOpen className="account-page__icon" /> Quản lý đơn hàng
              </li>
              <li onClick={() => setActiveTab("store")} className={activeTab === "store" ? "account-page__active" : ""}>
                <FaEye className="account-page__icon" /> Tìm cửa hàng
              </li>
              {/* <li onClick={() => setActiveTab("logout")} className={activeTab === "logout" ? "account-page__active" : ""}>
                <FaSignOutAlt className="account-page__icon" /> Đăng xuất
              </li> */}
            </ul>
          </div>

          <div className="account-page__main-content">{renderContent()}</div>
        </div>
        <Footer />
      </div>
      {isLoading && (
        <Loading isLoading={isLoading} />
      )}
    </>

  );
};

export default AccountPage;
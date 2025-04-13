import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Menu from "/src/components/layout/Admin/Menu"; // Sidebar
import Menu_Header from "/src/components/layout/Admin/Menu_Header"; // Header
import "/src/assets/css/CommonProfile.css"; // Import CSS
import useUser from "../../../hooks/useUser";

const ProfilePage = () => {
  const { userInfor, updateUser } = useUser();
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [imageName, setImageName] = useState("");

  console.log(userInfor);

  // Khởi tạo giá trị cho form data từ userInfor
  const [formData, setFormData] = useState({ ...userInfor });
  console.log("Dữ liệu gửi lên:", formData);

  const [selectedFiles, setSelectedFiles] = useState(null);

  // Xu ly thay doi gia tri cua input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xu ly chon anh
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Xu ly slit file name
  const getFileNameSplit = (fileName) => {
    if(!fileName) return;
    setImageName(fileName.replace(/^[^_]+_[^_]+_/, "")); 
  };

  React.useEffect(() => {
    if(userInfor?.image) {
      getFileNameSplit(userInfor.image);
    }
  }, [userInfor.image]);


  // Xu ly submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    updateUser({ userid: userInfor.id, formData: formDataUpdate });
    setActiveUpdate(!activeUpdate);
  };

  return (
    <div className="dashboard-content">
      <div className="profile-container">
        {/* Banner */}
        <div className="profile-banner">
          <div className="avatar-container">
            <img
              src={`/images/avatar/${imageName}`}
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <h5 className="username">
            {userInfor.lastname} {userInfor.firstname}
          </h5>
        </div>

        {/* Form */}
        <Form className="" onSubmit={handleSubmit}>
          <div className="profile-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                disabled={!activeUpdate}
                style={{ cursor: !activeUpdate ? "not-allowed" : "text"}}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                disabled={!activeUpdate}
                style={{ cursor: !activeUpdate ? "not-allowed" : "text"}}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!activeUpdate}
                style={{ cursor: !activeUpdate ? "not-allowed" : "text"}}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                disabled={!activeUpdate}
                style={{ cursor: !activeUpdate ? "not-allowed" : "text"}}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                disabled={!activeUpdate}
                style={{ cursor: !activeUpdate ? "not-allowed" : "text"}}
              />
            </div>

            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                accept="/public/images/*"
                onChange={handleFileChange}
                disabled={!activeUpdate}
              />
            </div>
            <div className="form-group"></div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveUpdate(!activeUpdate)}
              style={{ background: !activeUpdate ? "#ecbb7b" : "#e99221" }}
            >
              {!activeUpdate ? "Update" : "Cancel"}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: !activeUpdate ? "#ecbb7b" : "#e99221" }}
              disabled={!activeUpdate}
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;

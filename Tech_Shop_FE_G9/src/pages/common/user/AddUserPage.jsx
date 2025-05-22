import React, { useState, useRef } from "react";
import "/src/assets/css/AddUserPage.css";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const AddUserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = {
    username: "",
    email: "",
    phone_number: "",
    firstname: "",
    lastname: "",
    dob: "",
    role: 3,
    active: true,
    gender: "Male",
    password: "",
    confirm_password: "",
    profilePicture: null,
  };
  const users = location.state?.user || initialState;
  const [formData, setFormData] = useState(users);
  const { createManager } = useUser();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const fileInputRef = useRef(null);
  // Xu ly thay doi gia tri cua input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xu ly reset form
  const handleCancel = () => {
    navigate("/common/UserPage");
  };

  // Xu ly chon anh
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };
  const [imageName, setImageName] = useState("");
  // Xu ly slit file name
  const getFileNameSplit = (fileName) => {
    if (!fileName) return;
    setImageName(fileName.replace(/^[^_]+_[^_]+_/, ""));
  };

  React.useEffect(() => {
    if (createManager?.image) {
      getFileNameSplit(createManager.image);
    }
  }, [createManager.image]);
  // Xu ly submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataCreate = new FormData();
    const formattedData = {
      ...formData,
      role: Number(formData.role),
    };
    formDataCreate.append(
      "user",
      new Blob([JSON.stringify(formattedData)], { type: "application/json" })
    );
    if (selectedFiles) {
      // append file vao formdata
      formDataCreate.append("fileImage", selectedFiles[0]);
    }
    createManager.mutate(formDataCreate, {
      onSuccess: () => {
        setFormData(initialState);
        setSelectedFiles(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      onError: (error) => {
        console.error("Create user role manager failed:", error);
        alert("Create user role manager failed:", error);
      },
    });
  };

  return (
    <div className="containers">
      <h2>User Management</h2>
      <p>Add/Update User</p>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Enter username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            placeholder="Enter phone number"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            placeholder="Enter firstname"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            placeholder="Enter lastname"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={(e) => {
              setFormData({ ...formData, role: Number(e.target.value) });
            }}
          >
            <option value="3">Manager</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="active" value={formData.active} onChange={handleChange}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group file-upload">
          <label>Profile Picture</label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit">
            Submit
          </button>
          <button type="submit" className="Cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;

import React, { useState } from "react";
import "/src/assets/css/AddUserPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const UpdateUserPage = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  // const [imageName, setImageName] = useState("");
  // const fileInputRef = useRef(null);
  // const [selectedFile, setSelectedFile] = useState(null);

  console.log("User:", user);

  const [formData, setFormData] = useState({
    id: user?.id || "",
    username: user?.username || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    role: user?.role?.id || 3,
    password: user?.password || "",
    active: user?.active ? true : false,
  });

  const handleStatusChange = (e) => {
    setFormData({ ...formData, active: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    const formattedUser = {
      ...formData,
      active: formData.active === "true",
    };

    console.log("Formatted User:", formattedUser);
    payload.append(
      "user",
      new Blob([JSON.stringify(formattedUser)], {
        type: "application/json",
      })
    );

    // if (selectedFile) {
    //   payload.append("fileImage", selectedFile);
    // }

    console.log("Payload:", payload);
    updateUser(
      { userid: formData.id, formData: payload },
      {
        onSuccess: () => {
          navigate("/common/UserPage");
        },
        onError: (error) => {
          console.error("Update failed:", error);
          alert("Update failed. Please try again.");
        },
      }
    );
  };

  const getRoleName = (roleId) => {
    const roleMap = {
      1: "USER",
      2: "ADMIN",
      3: "MANAGER",
    };
    return roleMap[roleId] || "UNKNOWN";
  };

  return (
    <div className="containers">
      <h2>User Management</h2>
      <p>Update User</p>
      <form onSubmit={handleSubmit} className="user-form">
        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            readOnly
            disabled
            className="form-control"
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            readOnly
            disabled
            className="form-control"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            readOnly
            disabled
            className="form-control"
          />
        </div>

        {/* First Name */}
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            readOnly
            disabled
            className="form-control"
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            readOnly
            disabled
            className="form-control"
          />
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            readOnly
            disabled
            className="form-control"
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            readOnly
            disabled
            className="form-control"
          />
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={getRoleName(formData.role)}
            readOnly
            disabled
            className="form-control"
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>
          <select
            name="active"
            value={formData.active}
            onChange={handleStatusChange}
            className="form-control"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="submit">
            Update
          </button>
          <button
            type="button"
            className="Cancel"
            onClick={() => navigate("/common/UserPage")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPage;

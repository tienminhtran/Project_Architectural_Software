import React from "react";
import Menu from "/src/components/layout/Admin/Menu"; // Sidebar
import Menu_Header from "/src/components/layout/Admin/Menu_Header"; // Header
import "/src/assets/css/CommonProfile.css"; // Import CSS

const ProfilePage = () => {
  // Dữ liệu tĩnh cho form
  const user = {
    firstName: "admin",
    lastName: "tech system",
    email: "admin@gmail.com",
    phone: "0242518421",
    username: "admin",
    dob: "1998-02-17",
  };

  return (
    <div className="dashboard-content">      
      <div className="profile-container">
        {/* Banner */}
        <div className="profile-banner">
          <div className="avatar-container">
            <img src="/images/avatar/default-avatar.png" alt="User Avatar" className="avatar" />
          </div>
          <h3 className="username">{user.lastName} {user.firstName}</h3>
        </div>

        {/* Form */}
        <div className="profile-form">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={user.firstName} disabled />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={user.lastName} disabled />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user.email} disabled />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" value={user.phone} disabled />
          </div>

          <div className="form-group">
            <label>User Name</label>
            <input type="text" value={user.username} disabled />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" value={user.dob} disabled />
          </div>
        </div>
        <div className="profile-form">
          <button className="btn btn-primary">Update</button>
          <button className="btn btn-primary">Save</button>
        </div>
      </div>        
    </div>
  );
};

export default ProfilePage;

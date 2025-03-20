import React, { useState } from "react";
import "/src/assets/css/CommonChangePassword.css"; // Import CSS nếu có

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp!");
      return;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    setError("");
    setSuccess("Đổi mật khẩu thành công!");
    console.log("Gửi dữ liệu:", { oldPassword, newPassword });

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="change-password-container">
      {/* Phần Header */}
      <div className="headers">
        <div className="avatar">  
          <span>User Avatar</span>  
        </div>
        <h2>Change Password</h2>
      </div>

      {/* Thông báo */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Form nhập mật khẩu */}
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>Mật khẩu cũ</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Mật khẩu mới</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Xác nhận mật khẩu mới</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>
      </form>
    </div>
  );
};

export default ChangePassword;

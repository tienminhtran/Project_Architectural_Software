import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Nếu bạn dùng React Router

const CheckCodePage = () => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Để chuyển hướng sau khi kiểm tra

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() === "") {
      setErrorMessage("Vui lòng nhập mã code.");
      return;
    }

    setErrorMessage("");
    alert("Mã code hợp lệ!");
    navigate("/"); // Hoặc chuyển đến bất kỳ trang nào sau khi kiểm tra
  };

  return (
    <div className="check-code-page">
      <div className="modal-content"> {/* Bạn có thể đổi tên class */}
        <h2>Kiểm Tra Mã Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Mã Code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
              placeholder="Nhập mã code"
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-actions">
            <button type="submit" className="submit-button">Kiểm tra</button>
          </div>
        </form>

        <button className="close-button" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

export default CheckCodePage;

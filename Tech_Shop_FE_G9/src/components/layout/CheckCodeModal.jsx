import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCode from '../../hooks/useCode'; // Import the custom hook
import '../../../src/assets/css/CheckCodePage.css'; // Import custom CSS if needed

const CheckCodePage = () => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { getAllCode, deleteCode } = useCode(); // Use custom hook for fetching codes and deleting

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.trim().length !== 6) {
      setErrorMessage("Vui lòng nhập đầy đủ 6 ký tự mã code.");
      return;
    }

    try {
      const allCodes = await getAllCode();
      const found = allCodes.response.find(
        (item) => item.code === code && item.active
      );

      console.log("Mã code đã nhập:", code);
      console.log("Danh sách mã code:", allCodes);

      if (found) {
        setErrorMessage("");
        alert("Mã code hợp lệ!");
        navigate("/common/formVoucher"); // Redirect to another page if necessary
      } else {
        setErrorMessage("Mã code không tồn tại hoặc đã bị vô hiệu hóa.");
      }
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi kiểm tra mã code.");
      console.error("Lỗi kiểm tra code:", error);
    }
  };

  const handleDeleteCode = async () => {
    try {
      await deleteCode(code); // Call the delete function with the code to delete
      alert("Mã code đã được xóa!");
      navigate("/"); // Redirect to a different page after deletion
    } catch (error) {
      alert("Đã xảy ra lỗi khi xóa mã code.");
      console.error("Lỗi xóa code:", error);
    }
  };

  return (
    <div className="check-code__page">
      <div className="check-code__modal-content">
        <h2>Kiểm Tra Mã Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="check-code__code-inputs">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={code[i] || ""}
                onChange={(e) => {
                  const newCode = code.split("");
                  newCode[i] = e.target.value.replace(/[^0-9a-zA-Z]/gi, "");
                  setCode(newCode.join(""));
                  const next = e.target.nextSibling;
                  if (next && e.target.value) next.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !code[i] && i > 0) {
                    const prev = e.target.previousSibling;
                    if (prev) prev.focus();
                  }
                }}
                className="check-code__digit-input"
              />
            ))}
          </div>

          {errorMessage && <p className="check-code__error-message">{errorMessage}</p>}

          <div className="check-code__form-actions">
            <button type="submit" onClick={handleDeleteCode} className="check-code__submit-button">Kiểm tra</button>
            {/* <button type="button" onClick={handleDeleteCode} className="check-code__delete-button">Xóa Mã Code</button> */}
          </div>
        </form>

        <button className="check-code__close-button" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

export default CheckCodePage;

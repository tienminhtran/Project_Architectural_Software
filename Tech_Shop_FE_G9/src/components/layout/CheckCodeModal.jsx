import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCode from '../../hooks/useCode';
import '../../../src/assets/css/CheckCodePage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckCodePage = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const { getAllCode, deleteCode } = useCode();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.trim().length !== 6) {
      toast.error("Vui lòng nhập đầy đủ 6 ký tự mã code!", {
        position: "top-center",
      });
      return;
    }

    try {
      const allCodes = await getAllCode();
      const found = allCodes.response.find(
        (item) => item.code === code && item.active
      );

      if (found) {
        toast.success("Mã code hợp lệ!", {
          position: "top-center",
          autoClose: 1500,
          onClose: () => {
            handleDeleteCode(); // Xóa mã sau khi xác nhận
          },
        });
      } else {
        toast.error("Mã code không tồn tại hoặc đã bị vô hiệu hóa!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Lỗi khi kiểm tra mã code!", {
        position: "top-center",
      });
      console.error("Lỗi kiểm tra code:", error);
    }
  };

  const handleDeleteCode = async () => {
    try {
      await deleteCode(code);
      navigate("/common/formVoucher");
    } catch (error) {
      console.error("Lỗi xóa code:", error);
    }
  };

  return (
    <>
      <ToastContainer />
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

            <div className="check-code__form-actions">
              <button
                type="submit"
                className="check-code__submit-button"
              >
                Submit code
              </button>
            </div>
          </form>

          <button
            className="check-code__close-button"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckCodePage;

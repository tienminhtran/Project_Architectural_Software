import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCode from '../../hooks/useCode';
import '../../../src/assets/css/CheckCodePage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckCodePage = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { getAllCode, deleteCode } = useCode();

  // Autofocus the first input on mount
  useEffect(() => {
    document.querySelector('.check-code__digit-input')?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.trim().length !== 6) {
      toast.error('Vui lòng nhập đầy đủ 6 ký tự mã code!', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const allCodes = await getAllCode();
      const found = allCodes.response.find(
        (item) => item.code === code && item.active
      );

      if (found) {
        toast.success('Mã code hợp lệ!', {
          position: 'top-center',
          autoClose: 1500,
          onClose: () => {
            handleDeleteCode();
          },
        });
      } else {
        toast.error('Mã code không tồn tại hoặc đã bị vô hiệu hóa!', {
          position: 'top-center',
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error('Lỗi khi kiểm tra mã code!', {
        position: 'top-center',
        autoClose: 2000,
      });
      console.error('Lỗi kiểm tra code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCode = async () => {
    try {
      await deleteCode(code);
      navigate('/common/formVoucher', { state: { code } }); // Pass code to next page if needed
    } catch (error) {
      console.error('Lỗi xóa code:', error);
      toast.error('Lỗi khi xóa mã code!', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9a-zA-Z]/gi, '');
    if (pastedData.length === 0) {
      toast.error('Mã code dán vào không hợp lệ!', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }
    if (pastedData.length <= 6) {
      setCode(pastedData.padEnd(6, '')); // Pad with empty strings if shorter
      const lastFilledIndex = Math.min(pastedData.length - 1, 5);
      const inputs = e.target.parentElement.querySelectorAll('input');
      if (inputs[lastFilledIndex]) {
        inputs[lastFilledIndex].focus();
      }
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
                  value={code[i] || ''}
                  onChange={(e) => {
                    const newCode = code.split('');
                    newCode[i] = e.target.value.replace(/[^0-9a-zA-Z]/gi, '');
                    setCode(newCode.join(''));
                    const next = e.target.nextSibling;
                    if (next && e.target.value) next.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !code[i] && i > 0) {
                      const prev = e.target.previousSibling;
                      if (prev) {
                        const newCode = code.split('');
                        newCode[i - 1] = '';
                        setCode(newCode.join(''));
                        prev.focus();
                      }
                    }
                  }}
                  onPaste={(e) => i === 0 && handlePaste(e)}
                  className="check-code__digit-input"
                  aria-label={`Code digit ${i + 1}`}
                  disabled={isLoading}
                />
              ))}
            </div>

            <div className="check-code__form-actions">
              <button
                type="submit"
                className="check-code__submit-button"
                disabled={isLoading}
              >
                {isLoading ? 'Đang kiểm tra...' : 'Submit code'}
              </button>
            </div>
          </form>

          <button
            className="check-code__close-button"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Quay lại
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckCodePage;
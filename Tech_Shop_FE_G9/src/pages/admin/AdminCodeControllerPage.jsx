import React, { useState, useEffect } from 'react';
import useCode from '../../hooks/useCode';

const AdminCodeControllerPage = () => {
  const [code, setCode] = useState(null);
  const [isUsingCode, setIsUsingCode] = useState(false); // Để theo dõi xem người dùng đã sử dụng mã chưa
  const { createCode } = useCode();

  // Hàm tạo mã mới ngẫu nhiên
  const generateRandomCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000); // Tạo mã 6 chữ số
    setCode(randomCode.toString()); // Cập nhật mã mới
  };

  // Tạo mã mới mỗi 30 giây
  useEffect(() => {
    const interval = setInterval(generateRandomCode, 60000); // Gọi hàm mỗi 60 giây
    generateRandomCode(); // Tạo mã ngay khi lần đầu tiên tải trang

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
  }, []);

  // Hàm lưu mã vào database khi người dùng nhấn nút "Sử dụng mã"
  const handleUseCode = async () => {
    if (isUsingCode) return; // Nếu mã đã được sử dụng, không làm gì thêm

    try {
      await createCode({ code }); // Lưu mã vào database
      setIsUsingCode(true); // Đánh dấu là mã đã được sử dụng
      alert("Mã đã được sử dụng và lưu vào database!");
    } catch (error) {
      console.error('Error saving code:', error);
      alert("Không thể lưu mã vào database. Vui lòng thử lại!");
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      maxWidth: '600px',
      margin: '50px auto',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#333' }}>Trang Quản Trị Mã Code</h1>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f1f9ff',
        border: '1px solid #007bff',
        borderRadius: '8px',
        fontSize: '18px',
        color: '#007bff',
        fontWeight: 'bold'
      }}>
        Mã Code hiện tại: <span style={{ fontFamily: 'monospace' }}>{code}</span>
      </div>

      <button
        onClick={handleUseCode}
        disabled={isUsingCode || !code}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isUsingCode || !code ? 'not-allowed' : 'pointer',
          marginTop: '20px',
          transition: 'background-color 0.3s ease'
        }}
      >
        {isUsingCode ? 'Mã đã được sử dụng' : 'Sử dụng Mã'}
      </button>
    </div>
  );
};

export default AdminCodeControllerPage;

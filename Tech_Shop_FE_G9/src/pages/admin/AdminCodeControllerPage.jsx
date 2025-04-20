import React, { useState, useEffect } from 'react';
import useCode from '../../hooks/useCode';
import { toast } from 'react-toastify';


const AdminCodeControllerPage = () => {
  const [code, setCode] = useState(null);
  const [isUsingCode, setIsUsingCode] = useState(false); 
  const [inputCode, setInputCode] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); 
  const { createCode, checkCodeStatus } = useCode();

  const generateRandomCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000); 
    setCode(randomCode.toString()); 
  };

  useEffect(() => {
    const interval = setInterval(generateRandomCode, 60000); 
    generateRandomCode(); 

    return () => clearInterval(interval); 
  }, []);


  const handleUseCode = async () => {
    if (isUsingCode) return;
  
    if (!code || code.length !== 6) {
      toast.warning('Mã không hợp lệ! Vui lòng kiểm tra lại.', {
        position: 'top-center',
      });
      return;
    }
  
    try {
      await createCode({ code });
      setIsUsingCode(true);
      toast.success('Mã code đã được sử dụng thành công!', {
        position: 'top-center',
        autoClose: 2000,
      });
    } catch (error) {
      toast.error('Lỗi không tạo được mã. Bạn cần tạo thủ công.', {
        position: 'top-center',
      });
      console.error('Error creating code:', error);
    }
  };

  const handleCodeInputChange = async (event) => {
    const { value } = event.target;
    setInputCode(value);

    const result = await checkCodeStatus(value);
    setStatusMessage(result.message);
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

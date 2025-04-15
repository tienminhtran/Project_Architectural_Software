import React, { useState, useEffect } from 'react';
import useCode from '../../hooks/useCode';

const AdminCodeControllerPage = () => {
  const [code, setCode] = useState(null);
  const [isUsingCode, setIsUsingCode] = useState(false); // Track if the code has been used
  const [inputCode, setInputCode] = useState(''); // For user input code
  const [statusMessage, setStatusMessage] = useState(''); // For status feedback
  const { createCode, checkCodeStatus } = useCode();

  // Generate a random 6-digit code
  const generateRandomCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
    setCode(randomCode.toString()); // Set the generated code
  };

  // Generate a new code every 60 seconds
  useEffect(() => {
    const interval = setInterval(generateRandomCode, 60000); // Call every 60 seconds
    generateRandomCode(); // Generate code when the component first loads

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Handle when the user clicks "Use Code"
  const handleUseCode = async () => {
    if (isUsingCode) return; // If the code has already been used, do nothing

    if (!code || code.length !== 6) {
      alert('Mã không hợp lệ!');
      return;
    }

    try {
      await createCode({ code }); // Save the code to the database
      setIsUsingCode(true); // Mark as used
      // alert('Mã đã được sử dụng và lưu vào database!');
    } catch (error) {
      console.error('Error saving code:', error);
      // alert('Không thể lưu mã vào database. Vui lòng thử lại!');
    }
  };

  // Handle input change for checking code status
  const handleCodeInputChange = async (event) => {
    const { value } = event.target;
    setInputCode(value);

    // Check the status of the input code
    const result = await checkCodeStatus(value);
    setStatusMessage(result.message); // Set the status message for feedback
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

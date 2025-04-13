import React, { useState } from 'react';
import useVoucher from '../../hooks/useCode';

const AdminCodeControllerPage = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const { createCode } = useVoucher();

  const handleGenerateCode = async () => {
    setLoading(true);
    try {
      const newCode = await createCode({}); 
      setCode(newCode); 
      setLoading(false);
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate code. Please try again!');
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', maxWidth: '600px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>Trang Quản Trị Mã Code Dùng cho voucher</h1>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleGenerateCode}
          disabled={loading}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', marginBottom: '20px' }}
        >
          {loading ? 'Đang tạo mã...' : 'Tạo Mã Code'}
        </button>

        {code && (
          <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '5px', border: '1px solid #007bff' }}>
            <h3 style={{ fontSize: '20px', color: '#007bff' }}>Mã Code: {code}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCodeControllerPage;

import React from 'react';

const BankQR = ({ amount, orderCode }) => {
    const bankId = 'TCB'; // Techcombank
    const accountNumber = '19038207576016'; 
    const qrURL = `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.jpg?amount=${amount}&addInfo=${orderCode}`;

    return (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h4>Quét mã để chuyển khoản Techcombank</h4>
            <img src={qrURL} alt="QR chuyển khoản Techcombank" style={{ width: '220px' }} />
            <p>Vui lòng không thay đổi nội dung chuyển khoản: <strong>{orderCode}</strong></p>
        </div>
    );
};

export default BankQR;

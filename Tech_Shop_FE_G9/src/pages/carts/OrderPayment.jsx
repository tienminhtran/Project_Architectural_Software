import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CheckoutStepper from './CheckoutStepper';
import '../../assets/css/OrderPayment.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PayPalButton from './PayPalButton';
import HeardUserBasic from "../../components/layout/HeaderUserBasic"; // Adjust the path as necessary
import FooterUser from "../../components/layout/Footer";
// Helper function to format currency
const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

// Component tạo mã QR ngân hàng TCB
const BankQR = ({ amount, orderCode }) => {
    const bankId = 'TCB';
    const accountNumber = '19038207576016'; // thay bằng số tài khoản thật
    const qrURL = `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.jpg?amount=${amount}&addInfo=${orderCode}`;

    return (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h4>Quét mã để chuyển khoản Techcombank</h4>
            <img src={qrURL} alt="QR chuyển khoản" style={{ width: '220px' }} />
            <p><strong>Nội dung chuyển khoản:</strong> {orderCode}</p>
        </div>
    );
};

const OrderPayment = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('cod');
    const [cartData, setCartData] = useState(null);
    const orderCode = 'G-Nice-' + Date.now(); // random mã đơn hàng

    useEffect(() => {
        const storedData = sessionStorage.getItem('cartData');
        if (storedData) {
            setCartData(JSON.parse(storedData));
        } else {
            navigate('/'); // Nếu không có dữ liệu, điều hướng về trang giỏ hàng
        }
    }, [navigate]);

    const totalAmount = cartData ? cartData.totalPrice + 19000 : 0; // Tạm tính + phí vận chuyển

    const handlePayment = () => {
        toast.success('Thanh toán thành công!', {
            position: 'top-center',
            autoClose: 1500,
            onClose: () => navigate('/order-complete'),
        });
    };

    if (!cartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <HeardUserBasic />
            <div style={{ display: 'flex' }}>

                <div>
                    <img src="../../../public/images/bg/thu-cu-doi-moi.png" alt="Logo" className="CartBuy-OrderBox__logo"
                    style={{ width: "160px"}} />
                </div>


                <div className="OrderPayment__container">
                    <CheckoutStepper currentStep={2} />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="OrderPayment__section"
                    >
                        <div className="OrderPayment__title">Phương thức thanh toán</div>

                        <div className="OrderPayment__method">
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={selectedMethod === 'cod'}
                                    onChange={() => setSelectedMethod('cod')}
                                />
                                Thanh toán khi nhận hàng (COD)
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="bank"
                                    checked={selectedMethod === 'bank'}
                                    onChange={() => setSelectedMethod('bank')}
                                />
                                Chuyển khoản ngân hàng
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="paypal"
                                    checked={selectedMethod === 'paypal'}
                                    onChange={() => setSelectedMethod('paypal')}
                                />
                                Thanh toán qua PayPal
                            </label>
                        </div>

                        {selectedMethod === 'bank' && (
                            <>
                                <div className="OrderPayment__bankInfo">
                                    <p><strong>Ngân hàng:</strong> Techcombank (TCB)</p>
                                    <p><strong>Số tài khoản:</strong> 0123456789</p>
                                    <p><strong>Chủ tài khoản:</strong> Công ty TNHH 4 CON ĐẾ</p>
                                </div>

                                <BankQR amount={totalAmount} orderCode={orderCode} />
                            </>
                        )}

                        <div className="OrderPayment__summary">
                            <div className="OrderPayment__row">
                                <span>Tạm tính:</span>
                                <span className="OrderInfoForm__totalPrice">{cartData ? formatCurrency(cartData.totalPrice) : '0đ'}</span>
                            </div>
                            <div className="OrderPayment__row">
                                <span>Phí vận chuyển:</span>
                                <span>{formatCurrency(19000)}</span>
                            </div>
                            <div className="OrderPayment__total">
                                <strong>Tổng cộng:</strong>
                                <strong>{cartData ? formatCurrency(totalAmount) : '0đ'}</strong>
                            </div>
                        </div>

                        {selectedMethod === 'paypal' ? (
                            <PayPalButton
                                amount={totalAmount.toFixed(2)} // Ensure the amount is correctly formatted for PayPal
                                onSuccess={(details) => {
                                    toast.success(`Thanh toán thành công bởi ${details.payer.name.given_name}`, {
                                        position: 'top-center',
                                        autoClose: 2000,
                                        onClose: () => navigate('/order-complete'),
                                    });
                                }}
                            />
                        ) : (
                            <button className="OrderPayment__submitBtn" onClick={handlePayment}>
                                XÁC NHẬN THANH TOÁN
                            </button>
                        )}
                    </motion.div>
                </div>

                <div>
                    <img src="../../../public/images/bg/mua-he-ruc-ro.png" alt="Logo" className="CartBuy-OrderBox__logo"
                    style={{ width: "160px"}} />
                </div>
            </div>
            <FooterUser />
        </div>


    );
};

export default OrderPayment;
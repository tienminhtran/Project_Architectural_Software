import React from 'react';
import { motion } from 'framer-motion';
import CheckoutStepper from './CheckoutStepper';
import '../../assets/css/OrderPayment.css';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';


const OrderPayment = () => {
    const navigate = useNavigate();
    const handlePayment = () => {
        toast.success('Thanh toán thành công!', {
            position: 'top-center',
            autoClose: 1500,
            onClose: () => navigate('/order-complete'),
        });
    };

    return (
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
                        <input type="radio" name="payment" defaultChecked /> Thanh toán khi nhận hàng (COD)
                    </label>
                    <label>
                        <input type="radio" name="payment" /> Chuyển khoản ngân hàng
                    </label>
                    <label>
                        <input type="radio" name="payment" /> Ví điện tử (Momo, ZaloPay, VNPay)
                    </label>
                </div>

                <div className="OrderPayment__summary">
                    <div className="OrderPayment__row">
                        <span>Tạm tính:</span>
                        <span>200.000đ</span>
                    </div>
                    <div className="OrderPayment__row">
                        <span>Phí vận chuyển:</span>
                        <span>19.000đ</span>
                    </div>
                    <div className="OrderPayment__total">
                        <strong>Tổng cộng:</strong>
                        <strong>219.000đ</strong>
                    </div>
                </div>

                <button className="OrderPayment__submitBtn" onClick={handlePayment} >
                    XÁC NHẬN THANH TOÁN
                </button>
            </motion.div>
        </div>
    );
};

export default OrderPayment;

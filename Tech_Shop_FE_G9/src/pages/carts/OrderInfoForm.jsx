import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CheckoutStepper from './CheckoutStepper';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/OrderInfoForm.css';
import DeliveryWithGeolocation from './DeliveryWithGeolocation'; 

const OrderInfoForm = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState('Anh');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [invoice, setInvoice] = useState(false);
    const [cartData, setCartData] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem('cartData');
        if (storedData) {
            setCartData(JSON.parse(storedData));
        } else {
            navigate('/'); // Nếu không có dữ liệu, điều hướng về trang giỏ hàng
        }
    }, [navigate]);

    if (!cartData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="OrderInfoForm__container">
            <CheckoutStepper currentStep={1} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="OrderInfoForm__section"
            >
                {/* Thông tin khách hàng */}
                <div className="OrderInfoForm__title">Thông tin khách mua hàng</div>
                <div className="OrderInfoForm__row">
                    <label>
                        <input
                            type="radio"
                            value="Anh"
                            checked={gender === 'Anh'}
                            onChange={(e) => setGender(e.target.value)}
                        /> Anh
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Chị"
                            checked={gender === 'Chị'}
                            onChange={(e) => setGender(e.target.value)}
                        /> Chị
                    </label>
                </div>
                <div className="OrderInfoForm__row">
                    <input
                        type="text"
                        placeholder="Nhập họ tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <DeliveryWithGeolocation/>

                <textarea
                    placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

                <div className="OrderInfoForm__row">
                    <label>
                        <input
                            type="checkbox"
                            checked={invoice}
                            onChange={(e) => setInvoice(e.target.checked)}
                        /> Xuất hoá đơn cho đơn hàng
                    </label>
                </div>

                {/* Hiển thị chỉ tổng giá giỏ hàng */}
                <div className="OrderInfoForm__totalRow">
                    <span>Tổng tiền:</span>
                    <span className="OrderInfoForm__totalPrice">{cartData.totalPrice}đ</span>
                </div>

                <button className="OrderInfoForm__submitBtn" onClick={() => navigate('/order-payment')}>
                    THANH TOÁN
                </button>
            </motion.div>
        </div>
    );
};

export default OrderInfoForm;

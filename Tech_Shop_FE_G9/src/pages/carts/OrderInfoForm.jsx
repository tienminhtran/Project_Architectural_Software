import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CheckoutStepper from './CheckoutStepper';
import '../../assets/css/OrderInfoForm.css';
import { useNavigate } from "react-router-dom";

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


    return (
        <div className="OrderInfoForm__container">
            <CheckoutStepper currentStep={1} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="OrderInfoForm__section"
            >
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

                <div className="OrderInfoForm__title">Địa chỉ giao hàng</div>
                <div className="OrderInfoForm__row">
                    <select value={province} onChange={(e) => setProvince(e.target.value)}>
                        <option>Chọn Tỉnh, Thành phố</option>
                        <option>TP. HCM</option>
                        <option>Hà Nội</option>
                    </select>
                    <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                        <option>Chọn Quận, Huyện</option>
                        <option>Quận 1</option>
                        <option>Quận 3</option>
                    </select>
                </div>

                <div className="OrderInfoForm__row">
                    <select value={ward} onChange={(e) => setWard(e.target.value)}>
                        <option>Chọn Phường, Xã</option>
                        <option>Phường 1</option>
                        <option>Phường 3</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Số nhà, tên đường"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

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

                <div className="OrderInfoForm__totalRow">
                    <span>Tổng tiền:</span>
                    <span className="OrderInfoForm__totalPrice">219.000đ</span>
                </div>

                <button className="OrderInfoForm__submitBtn" onClick={() => navigate('/order-payment')}>
                    THANH TOÁN
                </button>
            </motion.div>
        </div>
    );
};

export default OrderInfoForm;

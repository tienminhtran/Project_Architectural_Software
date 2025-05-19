import React from "react";
import { useNavigate } from "react-router-dom"; // Thêm cái này
import { motion } from "framer-motion";
import {
    FaShoppingCart,
    FaInfoCircle,
    FaCreditCard,
    FaCheckCircle
} from "react-icons/fa";
import "./CheckoutStepper.css";

const steps = [
    { label: "Giỏ hàng", icon: <FaShoppingCart />, path: "/cart" },
    { label: "Thông tin đơn hàng", icon: <FaInfoCircle />, path: "/order-info-form" },
    { label: "Thanh toán", icon: <FaCreditCard />, path: "/order-payment" },
    { label: "Hoàn tất", icon: <FaCheckCircle />, path: "/order-complete" },
];

const CheckoutStepper = ({ currentStep }) => {
    const navigate = useNavigate(); // Hook điều hướng

    return (
        <div className="CheckoutStepper">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <motion.div
                        className={`CheckoutStepper__step ${
                            index === currentStep ? "current" : index < currentStep ? "completed" : ""
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        onClick={() => {
                            if (index <= currentStep) {
                                navigate(step.path); // Điều hướng tới bước tương ứng
                            }
                        }}
                        style={{ cursor: index <= currentStep ? "pointer" : "default" }}
                    >
                        <div className="CheckoutStepper__icon">{step.icon}</div>
                        <div className="CheckoutStepper__label">{step.label}</div>
                    </motion.div>
                    {index < steps.length - 1 && (
                        <div className={`CheckoutStepper__divider ${index < currentStep ? "active" : ""}`}>
                            {/* ----------------- */}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default CheckoutStepper;

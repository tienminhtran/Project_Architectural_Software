import React from "react";
import { motion } from "framer-motion";
import {
    FaShoppingCart,
    FaInfoCircle,
    FaCreditCard,
    FaCheckCircle
} from "react-icons/fa";
import "./CheckoutStepper.css";

const steps = [
    { label: "Giỏ hàng", icon: <FaShoppingCart /> },
    { label: "Thông tin đơn hàng", icon: <FaInfoCircle /> },
    { label: "Thanh toán", icon: <FaCreditCard /> },
    { label: "Hoàn tất", icon: <FaCheckCircle /> },
];

const CheckoutStepper = ({ currentStep }) => {
    return (
        <div className="CheckoutStepper">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <motion.div
                        className={`CheckoutStepper__step ${
                            index <= currentStep ? "active" : ""
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <div className="CheckoutStepper__icon">{step.icon}</div>
                        <div className="CheckoutStepper__label">{step.label}</div>
                    </motion.div>
                    {index < steps.length - 1 && (
                        <div className={`CheckoutStepper__divider ${index < currentStep ? "active" : ""}`}>-----------------</div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default CheckoutStepper;

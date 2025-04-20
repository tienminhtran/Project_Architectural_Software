import React, { useState } from "react";
import CheckoutStepper from "./CheckoutStepper";
import { FaTrash, FaAngleDown , FaAngleUp } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import style cho confirm-alert
import '../../assets/css/CartBuyOrderBox.css';

const CartBuyOrderBox = () => {
    const navigate = useNavigate();

    const [currentStep] = useState(0); // Bước: Giỏ hàng
    const [cartItems, setCartItems] = useState([
        {
            name: "Tấm lót chuột Steelseries Qck Mini Mousepad",
            image: "/images/product/mouse3.jpg",
            price: 219000,
            originalPrice: 250000,
            quantity: 1,
        },
        {
            name: "Chuột gaming Logitech G102",
            image: "/images/product/mouse1.jpg",
            price: 299000,
            originalPrice: 390000,
            quantity: 2,
        },
        {
            name: "Bàn phím cơ DareU EK87",
            image: "/images/product/keyboard.jpg",
            price: 590000,
            originalPrice: 690000,
            quantity: 1,
        }
    ]);

    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [showAllItems, setShowAllItems] = useState(false);

    const formatPrice = (price) =>
        price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const updated = [...cartItems];
        updated[index].quantity = newQuantity;
        setCartItems(updated);
    };

    const handleRemove = (index) => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xoá sản phẩm này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => {
                        const productName = cartItems[index].name;
                        const updated = cartItems.filter((_, i) => i !== index);
                        setCartItems(updated);
                        toast.success(`${productName} đã được xóa thành công!`, {
                            position: "top-center",
                            autoClose: 3000,
                        });
                    }
                },
                {
                    label: 'Không',
                    onClick: () => { /* Không làm gì khi bấm 'Không' */ }
                }
            ]
        });
    };

    const handleApplyDiscount = () => {
        if (code === "GIAM10") {
            setDiscount(0.1);
        } else {
            setDiscount(0);
            toast.error("Mã giảm giá không hợp lệ", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const finalPrice = totalPrice * (1 - discount);
    const displayedItems = showAllItems ? cartItems : cartItems.slice(0, 2);

    // Lưu dữ liệu giỏ hàng vào sessionStorage khi nhấn vào "NHẬP THÔNG TIN KHÁCH HÀNG"
    const handleCheckout = () => {
        const cartData = {
            cartItems, // Danh sách sản phẩm trong giỏ hàng
            totalPrice: finalPrice, // Tổng tiền sau khi áp dụng giảm giá
        };

        // Lưu trữ dữ liệu vào sessionStorage
        sessionStorage.setItem('cartData', JSON.stringify(cartData));

        // Điều hướng tới trang Step 2 (Thông tin khách hàng)
        navigate("/order-info-form");
    };

    return (
        <div style={{display: "flex"}} >
            <div>
                <img src="../../../public/images/bg/thu-cu-doi-moi.png" alt="Logo" className="CartBuy-OrderBox__logo"
                style={{ width: "160px"}} />
            </div>

            <div className="CartBuy-OrderBox__container">
            <div className="CartBuy-OrderBox__nav">
                <a href="#" className="CartBuy-OrderBox__navLink">&lt; Mua thêm sản phẩm khác</a>
            </div>

            <CheckoutStepper currentStep={currentStep} />

            {displayedItems.map((item, index) => (
                <div key={index} className="CartBuy-OrderBox__item">
                    <img src={item.image} alt={item.name} className="CartBuy-OrderBox__img" />
                    <div className="CartBuy-OrderBox__details">
                        <div className="CartBuy-OrderBox__name">{item.name}</div>
                        <div className="CartBuy-OrderBox__prices">
                            <span className="CartBuy-OrderBox__price">{formatPrice(item.price)}</span>
                            <span className="CartBuy-OrderBox__original">{formatPrice(item.originalPrice)}</span>
                        </div>
                        <div className="CartBuy-OrderBox__actions">
                            <button className="CartBuy-OrderBox__sl" onClick={() => handleQuantityChange(index, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                            <span>{item.quantity}</span>
                            <button className="CartBuy-OrderBox__sl" onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                            <button onClick={() => handleRemove(index)} className="CartBuy-OrderBox__deleteBtn">
                                <FaTrash /> <span style={{ marginLeft: 4 }}>Xoá</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {cartItems.length > 2 && (
                <div className="CartBuy-OrderBox__toggleList">
                    <button onClick={() => setShowAllItems(!showAllItems)}>
                        {showAllItems ? (
                            <>
                                Thu gọn sản phẩm <FaAngleUp />
                            </>
                        ) : (
                            <>
                                Mở tất cả sản phẩm <FaAngleDown />
                            </>
                        )}
                    </button>
                </div>
            )}

            <div className="CartBuy-OrderBox__discount">
                <div onClick={() => setShowDiscountInput(!showDiscountInput)}>
                    <span>Sử dụng mã giảm giá</span>
                    <span>{showDiscountInput ? <FaAngleUp /> : <FaAngleDown />}</span>
                </div>

                {showDiscountInput && (
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập mã giảm giá/Phiếu mua hàng"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button onClick={handleApplyDiscount}>Áp dụng</button>
                    </div>
                )}
            </div>

            <div className="CartBuy-OrderBox__total">
                <span>Tổng tiền:</span>
                <span className="CartBuy-OrderBox__totalPrice">{formatPrice(finalPrice)}</span>
            </div>

            <button
                className="CartBuy-OrderBox__checkoutBtn"
                onClick={handleCheckout}  // Gọi hàm lưu trữ và điều hướng
            >
                NHẬP THÔNG TIN KHÁCH HÀNG
            </button>

            <ToastContainer position="top-center" />
            </div>
            
            <div>
                <img src="../../../public/images/bg/mua-he-ruc-ro.png" alt="Logo" className="CartBuy-OrderBox__logo"
                style={{ width: "160px"}} />
            </div>
        </div>

    );
};

export default CartBuyOrderBox;

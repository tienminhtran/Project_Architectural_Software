import React, { useState, useEffect } from "react";
import CheckoutStepper from "./CheckoutStepper";
import { FaTrash, FaAngleDown , FaAngleUp } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import style cho confirm-alert
import '../../assets/css/CartBuyOrderBox.css';

import { formatPrice } from "../../utils/FormatPrice"; 
import useCart from "../../hooks/useCart";

const CartBuyOrderBox = ({cartItems}) => {
    console.log("cartItems 2", cartItems);
    const navigate = useNavigate();
    const { deleteItem, updateQuantity, error} = useCart(); 

    const [currentStep] = useState(0); // Bước: Giỏ hàng
    const [items, setCartItems] = useState([]);
    console.log("items",items);

    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [showAllItems, setShowAllItems] = useState(false);

    // select item
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectRow = (item) => {
        setSelectedRows((prev) => prev.includes(item?.id_product) ? prev.filter((x) => x !== item?.id_product) : [...prev, item?.id_product]);
    }
    console.log("selectedRows", selectedRows);

    // refresh khi reload trang
    useEffect(() => {
        setCartItems(cartItems || []); // Cập nhật giỏ hàng từ props
    }, [cartItems]);

    const handleQuantityChange = (id_product, newQuantity) => {
        if (newQuantity < 1) return;

        const index = items.findIndex(item => item.id_product === id_product);
        if (index === -1) return; // Nếu không tìm thấy sản phẩm trong giỏ hàng

        const updated = [...items];
        updated[index] = { ...updated[index], quantity: newQuantity }; // Cập nhật số lượng sản phẩm
        setCartItems(updated);
        updateQuantity({id: id_product, quantity: newQuantity}); 
    };

    const handleRemove = (id_product) => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xoá sản phẩm này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => {
                        const productName = items.find(item => item.id_product === id_product)?.name || "Sản phẩm";
                        const updatedItems = items.filter(item => item.id_product !== id_product);
                        setCartItems(updatedItems);
                        deleteItem(id_product); // Gọi hàm xóa sản phẩm từ giỏ hàng
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

    const totalPrice = items.reduce(
        (acc, item) => 
            selectedRows.includes(item.id_product) ? 
            acc + item.price * item.quantity : 
            acc, 0
    );

    const finalPrice = totalPrice * (1 - discount);
    const displayedItems = showAllItems ? items : items.slice(0, 2);
    console.log("displayedItems",displayedItems);

    // Lưu dữ liệu giỏ hàng vào sessionStorage khi nhấn vào "NHẬP THÔNG TIN KHÁCH HÀNG"
    const handleCheckout = () => {
        const cartData = {
            cartItems: items, // Updated to use 'items'
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
            <div className="d-flex flex-row gap-3">
                <p className="fs-6">Chọn tất cả</p>
                <input
                    type="checkbox"
                    checked={selectedRows.length === items.length}
                    onChange={() => {
                        if(selectedRows.length === items.length) {
                            setSelectedRows([]);
                        } else {
                            setSelectedRows(items.map(item => item.id_product));
                        }
                    }}
                    className="form-check-input"
                />
            </div>

            {displayedItems.map((item, index) => (
                <div key={index} className="CartBuy-OrderBox__item align-items-center">
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id_product)}
                        onChange={() => handleSelectRow(item)}
                        className="form-check-input"
                    />
                    <img src={item.thumbnail} alt={item.name} className="CartBuy-OrderBox__img" />
                    <div className="CartBuy-OrderBox__details">
                        <div className="CartBuy-OrderBox__name">{item.name}</div>
                        <div className="CartBuy-OrderBox__prices">
                            <span className="CartBuy-OrderBox__price">{formatPrice(item.price)}</span>
                            <span className="CartBuy-OrderBox__original">{formatPrice(21000000)}</span>
                        </div>
                        <div className="CartBuy-OrderBox__actions">
                            <button className="CartBuy-OrderBox__sl" onClick={() => handleQuantityChange(item.id_product, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                            <span>{item.quantity}</span>
                            <button className="CartBuy-OrderBox__sl" onClick={() => handleQuantityChange(item.id_product, item.quantity + 1)} disabled={error[item.id_product]}>+</button>

                            <button onClick={() => handleRemove(item.id_product)} className="CartBuy-OrderBox__deleteBtn">
                                <FaTrash /> <span style={{ marginLeft: 4 }}>Xoá</span>
                            </button>
                        </div>

                        {error[item.id_product] && (
                            <span className="fs-6 text-danger">{error[item.id_product]}</span>
                        )}
                    </div>
                </div>
            ))}
            {items.length > 2 && (
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

import React, { useState, useEffect } from "react";
import CheckoutStepper from "./CheckoutStepper";
import {
  FaTrash,
  FaAngleDown,
  FaAngleUp,
  FaTicketAlt,
  FaAngleRight,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import style cho confirm-alert
import "../../assets/css/CartBuyOrderBox.css";
import useVoucher from "../../hooks/useVoucher";
import VoucherModal from "./VoucherModal";

import { formatPrice } from "../../utils/FormatPrice";
import useCart from "../../hooks/useCart";

const CartBuyOrderBox = ({ cartItems, product_checked, accessory_ids }) => {
  console.log("cartItems 2", cartItems);
  const navigate = useNavigate();
  const { deleteItem, updateQuantity, error } = useCart();

  const [currentStep] = useState(0); // Bước: Giỏ hàng
  const [items, setCartItems] = useState([]);
  console.log("items", items);

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  // const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  // select item
  const [selectedRows, setSelectedRows] = useState([]);
  // Add state for modal control
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  const handleSelectRow = (item) => {
    setSelectedRows((prev) =>
      prev.includes(item?.id_product)
        ? prev.filter((x) => x !== item?.id_product)
        : [...prev, item?.id_product]
    );
  };
  console.log("selectedRows", selectedRows);

  const { vouchers_paging } = useVoucher(0, 100); // Lấy danh sách voucher
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  // refresh khi reload trang
  useEffect(() => {
    setCartItems(cartItems || []); // Cập nhật giỏ hàng từ props

    // Kiểm tra xem có dữ liệu cartData trong sessionStorage không
    const storedCartData = sessionStorage.getItem("cartData");

    if (storedCartData) {
      const parsedCartData = JSON.parse(storedCartData);

      // Khôi phục selectedRows từ cartItems trong cartData
      if (parsedCartData.cartItems && parsedCartData.cartItems.length > 0) {
        // Lấy danh sách productId từ cartItems để thiết lập selectedRows
        const selectedProductIds = parsedCartData.cartItems.map(
          (item) => item.productId
        );
        setSelectedRows(selectedProductIds);
      }

      // Khôi phục selectedVoucher và discount từ appliedVoucher
      if (parsedCartData.appliedVoucher) {
        setSelectedVoucher(parsedCartData.appliedVoucher);
        setDiscount(parsedCartData.appliedVoucher.value / 100);
      }
    } else if (cartItems && product_checked) {
      if(accessory_ids) {
        console.log("accessory_ids", accessory_ids);
        setSelectedRows([product_checked, ...accessory_ids]);

      } else {

        setSelectedRows([product_checked]);
      }
      // Nếu không có cartData nhưng có product_checked
    } 
  }, [cartItems, product_checked, accessory_ids]);

  const handleQuantityChange = (id_product, newQuantity) => {
    if (newQuantity < 1) return;

    const index = items.findIndex((item) => item.id_product === id_product);
    if (index === -1) return; // Nếu không tìm thấy sản phẩm trong giỏ hàng

    const updated = [...items];
    updated[index] = { ...updated[index], quantity: newQuantity }; // Cập nhật số lượng sản phẩm
    setCartItems(updated);
    updateQuantity({ id: id_product, quantity: newQuantity });
  };

  useEffect(() => {
    if (vouchers_paging?.data?.values) {
      // Lọc các voucher hợp lệ
      const validVouchers = vouchers_paging.data.values.filter((voucher) => {
        const today = new Date();
        const expiryDate = new Date(voucher.expiredDate);
        return voucher.quantity > 0 && expiryDate >= today;
      });

      setVouchers(validVouchers);
    }
  }, [vouchers_paging.data]);

  const handleRemove = (id_product) => {
    confirmAlert({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xoá sản phẩm này không?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            const productName =
              items.find((item) => item.id_product === id_product)?.name ||
              "Sản phẩm";
            const updatedItems = items.filter(
              (item) => item.id_product !== id_product
            );
            setCartItems(updatedItems);
            deleteItem(id_product); // Gọi hàm xóa sản phẩm từ giỏ hàng
            toast.success(`${productName} đã được xóa thành công!`, {
              position: "top-center",
              autoClose: 3000,
            });
          },
        },
        {
          label: "Không",
          onClick: () => {
            /* Không làm gì khi bấm 'Không' */
          },
        },
      ],
    });
  };

  // const handleApplyDiscount = () => {
  //   if (code === "GIAM10") {
  //     setDiscount(0.1);
  //   } else {
  //     setDiscount(0);
  //     toast.error("Mã giảm giá không hợp lệ", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //   }
  // };

  const totalPrice = items.reduce(
    (acc, item) =>
      selectedRows.includes(item.id_product)
        ? acc + item.price * item.quantity
        : acc,
    0
  );

  const finalPrice = totalPrice * (1 - discount);
  const displayedItems = showAllItems ? items : items.slice(0, 2);
  console.log("displayedItems", displayedItems);

  // Lưu dữ liệu giỏ hàng vào sessionStorage khi nhấn vào "NHẬP THÔNG TIN KHÁCH HÀNG"
  const handleCheckout = () => {
    if (!selectedRows || selectedRows.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm trước khi tiếp tục!", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    const selectedItems = items.filter((item) =>
      selectedRows.includes(item.id_product)
    );

    // Tạo dữ liệu giỏ hàng để lưu trữ
    const cartItemsWithQuantity = selectedItems.map((item) => ({
      productId: item.id_product,
      quantity: item.quantity,
    }));

    const cartData = {
      cartItems: cartItemsWithQuantity, // Updated to use 'items'
      totalPrice: finalPrice, // Tổng tiền sau khi áp dụng giảm giá
      appliedVoucher: selectedVoucher
        ? {
            id: selectedVoucher.id,
            name: selectedVoucher.name,
            value: selectedVoucher.value,
          }
        : null,
    };

    // Lưu trữ dữ liệu vào sessionStorage
    sessionStorage.setItem("cartData", JSON.stringify(cartData));

    // Điều hướng tới trang Step 2 (Thông tin khách hàng)
    navigate("/order-info-form");
  };

  // Hàm lọc các voucher dựa trên tổng giá trị giỏ hàng
  const getEligibleVouchers = () => {
    if (!vouchers || vouchers.length === 0) return [];

    if (totalPrice < 1000000) return [];

    return vouchers.filter((voucher) => {
      if (totalPrice >= 1000000 && totalPrice < 5000000 && voucher.value > 5) {
        return false;
      }

      if (totalPrice >= 5000000 && voucher.value > 10) {
        return false;
      }

      return true;
    });
  };

  // Hàm áp dụng voucher
  const handleApplyVoucher = (voucher) => {
    if (!voucher) {
      setDiscount(0);
      setSelectedVoucher(null);
      toast.info("Đã hủy áp dụng voucher", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    setSelectedVoucher(voucher);
    setDiscount(voucher.value / 100); // Chuyển đổi giá trị giảm giá thành tỷ lệ
    setCode(voucher.name);

    toast.success(
      `Đã áp dụng voucher ${voucher.name} (Giảm ${voucher.value}%)`,
      {
        position: "top-center",
        autoClose: 1000,
      }
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <img
          src="../../../public/images/bg/thu-cu-doi-moi.png"
          alt="Logo"
          className="CartBuy-OrderBox__logo"
          style={{ width: "160px" }}
        />
      </div>

      <div className="CartBuy-OrderBox__container">
        <div className="CartBuy-OrderBox__nav">
          <a href="#" className="CartBuy-OrderBox__navLink">
            &lt; Mua thêm sản phẩm khác
          </a>
        </div>

        <CheckoutStepper currentStep={currentStep} />
        <div className="d-flex flex-row gap-3">
          <p className="fs-6">Chọn tất cả</p>
          <input
            type="checkbox"
            checked={selectedRows.length === items.length}
            onChange={() => {
              if (selectedRows.length === items.length) {
                setSelectedRows([]);
              } else {
                setSelectedRows(items.map((item) => item.id_product));
              }
            }}
            className="form-check-input"
          />
        </div>

        {displayedItems.map((item, index) => (
          <div
            key={index}
            className="CartBuy-OrderBox__item align-items-center"
          >
            <input
              type="checkbox"
              checked={selectedRows.includes(item.id_product)}
              onChange={() => handleSelectRow(item)}
              className="form-check-input"
            />
            <img
              src={item.thumbnail}
              alt={item.name}
              className="CartBuy-OrderBox__img"
            />
            <div className="CartBuy-OrderBox__details">
              <div className="CartBuy-OrderBox__name">{item.name}</div>
              <div className="CartBuy-OrderBox__prices">
                <span className="CartBuy-OrderBox__price">
                  {formatPrice(item.price)}
                </span>
                <span className="CartBuy-OrderBox__original">
                  {formatPrice(21000000)}
                </span>
              </div>
              <div className="CartBuy-OrderBox__actions">
                <button
                  className="CartBuy-OrderBox__sl"
                  onClick={() =>
                    handleQuantityChange(item.id_product, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="CartBuy-OrderBox__sl"
                  onClick={() =>
                    handleQuantityChange(item.id_product, item.quantity + 1)
                  }
                  disabled={error[item.id_product]}
                >
                  +
                </button>

                <button
                  onClick={() => handleRemove(item.id_product)}
                  className="CartBuy-OrderBox__deleteBtn"
                >
                  <FaTrash /> <span style={{ marginLeft: 4 }}>Xoá</span>
                </button>
              </div>

              {error[item.id_product] && (
                <span className="fs-6 text-danger">
                  {error[item.id_product]}
                </span>
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
          <div
            onClick={() => setShowVoucherModal(true)}
            style={{ cursor: "pointer" }}
          >
            <span>
              <FaTicketAlt /> Sử dụng mã giảm giá
              {selectedVoucher && (
                <span className="selected-voucher-badge">
                  {" "}
                  {selectedVoucher.name} (-{selectedVoucher.value}%)
                </span>
              )}
            </span>
            <span>
              <FaAngleRight />
            </span>
          </div>

          {/* Modal hiển thị voucher */}
          <VoucherModal
            show={showVoucherModal}
            onClose={() => setShowVoucherModal(false)}
            totalPrice={totalPrice}
            vouchers={vouchers}
            selectedVoucher={selectedVoucher}
            handleApplyVoucher={handleApplyVoucher}
            getEligibleVouchers={getEligibleVouchers}
          />
          {/* Hiển thị thông tin voucher được chọn */}
          {selectedVoucher && (
            <div className="CartBuy-OrderBox__selected-voucher">
              <p>
                Đã áp dụng: {selectedVoucher.name} (Giảm {selectedVoucher.value}
                %)
              </p>
              <button onClick={() => handleApplyVoucher(null)}>
                Hủy voucher
              </button>
            </div>
          )}
        </div>

        <div className="CartBuy-OrderBox__total">
          <span>Tổng tiền:</span>
          <span className="CartBuy-OrderBox__totalPrice">
            {formatPrice(finalPrice)}
          </span>
        </div>

        <button
          className="CartBuy-OrderBox__checkoutBtn"
          onClick={handleCheckout} // Gọi hàm lưu trữ và điều hướng
        >
          NHẬP THÔNG TIN KHÁCH HÀNG
        </button>

        <ToastContainer position="top-center" />
      </div>

      <div>
        <img
          src="../../../public/images/bg/mua-he-ruc-ro.png"
          alt="Logo"
          className="CartBuy-OrderBox__logo"
          style={{ width: "160px" }}
        />
      </div>
    </div>
  );
};

export default CartBuyOrderBox;

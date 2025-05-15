import React from "react";
import "../../assets/css/VoucherModal.css";

const VoucherModal = ({
  show,
  onClose,
  totalPrice,
  vouchers,
  selectedVoucher,
  handleApplyVoucher,
  getEligibleVouchers,
}) => {
  if (!show) return null;

  const eligibleVouchers = getEligibleVouchers();

  return (
    <div className="voucher-modal-overlay" onClick={onClose}>
      <div className="voucher-modal" onClick={(e) => e.stopPropagation()}>
        <div className="voucher-modal-header">
          <h3>Chọn voucher giảm giá</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="voucher-modal-body">
          {totalPrice < 1000000 ? (
            <p className="no-voucher-message">
              Đơn hàng dưới 1 triệu không được áp dụng voucher
            </p>
          ) : eligibleVouchers.length > 0 ? (
            <>
              <p className="voucher-modal-title">
                {totalPrice < 5000000
                  ? "Vouchers áp dụng cho đơn hàng từ 1-5 triệu (Tối đa 5%)"
                  : "Vouchers áp dụng cho đơn hàng từ 5 triệu trở lên (Tối đa 10%)"}
              </p>

              <div className="voucher-modal-list">
                {eligibleVouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="voucher-item"
                    onClick={() => {
                      handleApplyVoucher(voucher);
                      onClose();
                    }}
                  >
                    <div className="voucher-code">{voucher.name}</div>
                    <div className="voucher-value">Giảm {voucher.value}%</div>
                    <div className="voucher-expiry">
                      Hết hạn:{" "}
                      {new Date(voucher.expiredDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="no-voucher-message">
              Không có voucher khả dụng cho đơn hàng này
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;

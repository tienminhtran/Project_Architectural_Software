import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../assets/css/AnnouncementBar.css";
import useVoucher from "../../hooks/useVoucher";

const AnnouncementBar = () => {
  const { vouchers_paging } = useVoucher(0, 100); // lấy 100 voucher đầu
  const vouchers = vouchers_paging.data?.values || [];

  // Lọc voucher còn hạn
  const validVouchers = vouchers.filter((voucher) => {
    const today = new Date();
    const expiry = new Date(voucher.expiredDate);
    return expiry >= today;
  });

  const messages = validVouchers.map((voucher) => ({
    text: `VOUCHER: ${voucher.name} - ${voucher.value}% OFF`,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [messages.length]);

  const currentMessage = messages[currentIndex];

  if (messages.length === 0) return null; // Không hiển thị nếu không có voucher hợp lệ

  return (
    <div className="announcement-bar">
      <div className="announcement-bar___marquee">
        <FaArrowLeft className="announcement-bar___icon" />
        <span className="announcement-bar___text marquee-animation">
          {currentMessage?.text}
        </span>
        <FaArrowRight className="announcement-bar___icon" />
      </div>
    </div>
  );
};

export default AnnouncementBar;

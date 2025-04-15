import React, { useEffect, useState } from "react";
import "../../../src/assets/css/saletopprice.css";
import { FaBolt, FaAngleRight } from "react-icons/fa";

const saletopprice = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date().getTime() + 3600 * 1000; // đếm ngược 1 giờ
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div className="sale-top-container">
      <div className="timer-box">
        <span>{formatNumber(timeLeft.hours)}</span>:
        <span>{formatNumber(timeLeft.minutes)}</span>:
        <span>{formatNumber(timeLeft.seconds)}</span>
      </div>
      <div className="title-sale">
        <FaBolt className="bolt-icon" />
        <span>
          <strong>LAP SALE </strong>
          <strong style={{ fontStyle: "italic" }}>GIÁ TOP</strong>
        </span>
      </div>
      <div className="view-detail">
        <a href="#">Xem chi tiết <FaAngleRight /></a>
      </div>
    </div>
  );
};

export default saletopprice;

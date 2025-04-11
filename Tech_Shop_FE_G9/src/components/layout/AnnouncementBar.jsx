import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../assets/css/AnnouncementBar.css";

const AnnouncementBar = () => {
  const messages = [
    { text: "STUDENT NOW GET 10% OFF :", link: "#", linkText: "GET OFFER" },
    { text: "FREE SHIPPING ON ORDERS OVER $50", link: "#", linkText: "SHOP NOW" },
    { text: "SUMMER SALE - UP TO 70% OFF", link: "#", linkText: "BROWSE SALE" },
    { text: "JOIN OUR REWARDS PROGRAM", link: "#", linkText: "SIGN UP" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển thông báo sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // 5 giây

    return () => clearInterval(interval); // cleanup
  }, [messages.length]);

  const currentMessage = messages[currentIndex];

  return (
    <div className="announcement-bar">
      <div className="announcement-bar___marquee">
        <FaArrowLeft className="announcement-bar___icon" />
        <span className="announcement-bar___text marquee-animation">
          {currentMessage.text}{" "}
          <a href={currentMessage.link} className="link">
            {currentMessage.linkText}
          </a>
        </span>
        <FaArrowRight className="announcement-bar___icon" />
      </div>
    </div>
  );
};

export default AnnouncementBar;

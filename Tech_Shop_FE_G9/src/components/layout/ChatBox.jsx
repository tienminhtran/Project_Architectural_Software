import React, { useState } from "react";
import OrderInquiry from "./ChatBoxOrderInquiry";
import ProductInquiry from "./ChatBoxProductInquiry";
import "../../assets/css/ChatBox.css";

const ChatBox = ({ onClose }) => {
  const [chat, setChat] = useState([]);
  const [mode, setMode] = useState(null); // null | "order" | "product"

  // Hàm thêm tin nhắn vào chat
  const addMessage = (msg) => setChat((prev) => [...prev, msg]);

  return (
    <div className="chat-box">
      <div className="chat-header">
        Hỗ trợ sản phẩm
        <button className="chat-close" onClick={onClose}>
          ×
        </button>
      </div>

      {!mode && (
        <div className="chat-body">
          <p>👋 Xin chào! Bạn muốn hỏi về gì?</p>
          <button className="btn" onClick={() => setMode("order")}>
            Tra cứu đơn hàng
          </button>
          <button className="btn" onClick={() => setMode("product")}>
            Hỏi về sản phẩm
          </button>
        </div>
      )}

      {mode === "order" && (
        <OrderInquiry addMessage={addMessage} />
      )}

      {mode === "product" && (
        <ProductInquiry addMessage={addMessage} />
      )}

      <div className="chat-messages">
        {chat.map((m, i) => (
          <div
            key={i}
            className={`chat-message ${m.sender === "bot" ? "bot" : "user"}`}
          >
            {m.text.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;

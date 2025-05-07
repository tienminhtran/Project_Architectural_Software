import React from 'react';
import '../../assets/css/ChatBox.css';

const ChatBox = ({ onClose }) => {
  return (
    <div className="chat-box">
      <div className="chat-header">
        Hỗ trợ
        <button className="chat-close" onClick={onClose}>×</button>
      </div>
      <div className="chat-body">
        <p>Xin chào 👋! Mình có thể giúp gì cho bạn?</p>
      </div>
    </div>
  );
};

export default ChatBox;

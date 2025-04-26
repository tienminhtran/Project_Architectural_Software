import React from 'react';
import '../../assets/css/CallButton.css';
const CallButton = () => {
    return (
      <div className="call-buttons">
        <a href="tel:0869188704" className="call-icon phone">
          <i className="fas fa-phone"></i>
          <span className="call-text">086 9188 704</span>
        </a>
  
        <a href="https://zalo.me/0869188704" className="call-icon zalo" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-messenger"></i> {/* có thể đổi icon zalo sau */}
          <span className="call-text">Chat Zalo</span>
        </a>
      </div>
    );
  };
export default CallButton;

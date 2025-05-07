import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/css/ChatBox.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
// import pro

const genAI = new GoogleGenerativeAI('AIzaSyD2JeiwtB4vBgqbhT_G_U-x6aS_Y22jKPM');
// dùng env
// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const ChatBox = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const parsePriceRange = (msg) => {
    const cleaned = msg.toLowerCase().replace(/[^0-9\s]/g, '');
    const digits = cleaned.match(/\d+/g)?.map(Number) || [];

    if (msg.includes('trên') || msg.includes('hơn')) return { min: digits[0] * 1_000_000, max: null };
    if (msg.includes('dưới') || msg.includes('ít hơn')) return { min: 0, max: digits[0] * 1_000_000 };
    if (msg.includes('tầm') || msg.includes('khoảng') || msg.includes('giữa')) {
      if (digits.length >= 2) return { min: digits[0] * 1_000_000, max: digits[1] * 1_000_000 };
    }
    return null;
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat(prev => [...prev, { sender: 'user', text: message }]);
    const priceRange = parsePriceRange(message);

    try {
      let values = [];

      if (priceRange) {
        const res = await axios.get(`http://localhost:8080/api/v1/products`);
        values = res.data?.response?.values || [];

        values = values.filter(p =>
          (!priceRange.min || p.price >= priceRange.min) &&
          (!priceRange.max || p.price <= priceRange.max)
        );

        if (values.length > 0) {
          setChat(prev => [...prev, {
            sender: 'bot',
            text: 'Đây là các sản phẩm phù hợp với mức giá bạn hỏi:'
          }]);
        } else {
          setChat(prev => [...prev, {
            sender: 'bot',
            text: 'Không tìm thấy sản phẩm nào trong khoảng giá đó.'
          }]);
        }
      } else {
        const res = await axios.get(`http://localhost:8080/api/v1/products/search/${encodeURIComponent(message)}`);
        values = res.data?.response?.values || [];

        if (values.length > 0) {
          setChat(prev => [...prev, {
            sender: 'bot',
            text: 'Dưới đây là kết quả bạn cần:'
          }]);
        } else {
          // Nếu không tìm thấy sản phẩm => hỏi Gemini
          const geminiRes = await model.generateContent(message);
          const geminiText = await geminiRes.response.text();

          setChat(prev => [...prev, {
            sender: 'bot',
            text: geminiText
          }]);
        }
      }

      setProducts(values);
    } catch (err) {
      setChat(prev => [...prev, { sender: 'bot', text: 'Lỗi hệ thống. Vui lòng thử lại sau.' }]);
    }

    setMessage('');
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        Hỗ trợ sản phẩm
        <button className="chat-close" onClick={onClose}>×</button>
      </div>

      {!expanded ? (
        <div className="chat-body">
          <p>👋 Xin chào! Mình có thể giúp gì cho bạn hôm nay?</p>
          <button className="chat-button" onClick={() => setExpanded(true)}>Hỏi về sản phẩm</button>
          <button className="chat-button">Kiểm tra đơn hàng</button>
          <button className="chat-button">Liên hệ nhân viên</button>
        </div>
      ) : (
        <>
          <div className="chat-log">
            {chat.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Hỏi về sản phẩm..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>

          {products.length > 0 && (
            <div className="chat-products">
              <h4>Sản phẩm gợi ý:</h4>
              <ul>
                {products.map(prod => (
                  <li key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.productName} />
                    <div>
                      <strong>{prod.productName}</strong><br />
                      {prod.price.toLocaleString()} VND
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatBox;

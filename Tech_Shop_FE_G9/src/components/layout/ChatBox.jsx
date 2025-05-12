import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/css/ChatBox.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyD2JeiwtB4vBgqbhT_G_U-x6aS_Y22jKPM');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const ChatBox = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // 1. Phân tích ý định từ câu hỏi người dùng
  const getIntent = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes("đơn hàng")) return "track_order";
    if (lower.includes("liên hệ") || lower.includes("nhân viên")) return "contact_staff";
    if (parsePriceRange(msg)) return "search_by_price";
    if (lower.includes("thông số") || lower.includes("cấu hình")) return "product_specs";
    if (lower.includes("đánh giá") || lower.includes("rating")) return "top_rated";
    if (lower.includes("bán chạy") || lower.includes("mua nhiều")) return "best_seller";
    return "search_general";
  };
  
  // 2. Hàm phân tích khoảng giá
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

  // 3. Gọi API lấy toàn bộ sản phẩm
  const fetchAllProducts = async () => {
    const res = await axios.get(`http://localhost:8080/api/v1/products`);
    return res.data?.response?.values || [];
  };

  // 4. Gọi API tìm kiếm theo từ khoá
  const searchProductsByQuery = async (query) => {
    const res = await axios.get(`http://localhost:8080/api/v1/products/search/${encodeURIComponent(query)}`);
    return res.data?.response?.values || [];
  };

  // 5. Gọi Gemini để trả lời tự động
  const getGeminiResponse = async (question) => {
    const res = await model.generateContent(question);
    return res.response.text();
  };

  // 6. Gửi tin nhắn
  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat(prev => [...prev, { sender: 'user', text: message }]);

    const intent = getIntent(message);

    try {
      let values = [];

      if (intent === "search_by_price") {
        const priceRange = parsePriceRange(message);
        values = await fetchAllProducts();
        values = values.filter(p =>
          (!priceRange.min || p.price >= priceRange.min) &&
          (!priceRange.max || p.price <= priceRange.max)
        );

        if (values.length > 0) {
          setChat(prev => [...prev, {
            sender: 'bot',
            text: '📦 Đây là các sản phẩm phù hợp với mức giá bạn hỏi:'
          }]);
        } else {
          setChat(prev => [...prev, {
            sender: 'bot',
            text: '❌ Không tìm thấy sản phẩm nào trong khoảng giá đó.'
          }]);
        }

      } else if (intent === "search_general") {
        values = await searchProductsByQuery(message);
        if (values.length > 0) {
          setChat(prev => [...prev, {
            sender: 'bot',
            text: '🔍 Dưới đây là kết quả bạn cần:'
          }]);
        } else {
          const geminiText = await getGeminiResponse(message);
          setChat(prev => [...prev, {
            sender: 'bot',
            text: `🤖 Trợ lý AI trả lời: ${geminiText}`
          }]);
        }

      } else if (intent === "track_order") {
        setChat(prev => [...prev, {
          sender: 'bot',
          text: '📦 Bạn có thể kiểm tra đơn hàng tại trang "Đơn hàng của tôi" hoặc nhập mã đơn hàng để tra cứu.'
        }]);
      } else if (intent === "contact_staff") {
        setChat(prev => [...prev, {
          sender: 'bot',
          text: '📞 Vui lòng liên hệ nhân viên CSKH qua số 1800 0000 hoặc chat trực tiếp tại đây.'
        }]);
      } else if (intent === "product_specs") {
        values = await searchProductsByQuery(message);
        if (values.length > 0) {
          setChat(prev => [...prev, {
            sender: 'bot',
            text: `📋 Thông số sản phẩm "${values[0].productName}": ${values[0].specs || 'Hiện chưa có thông tin chi tiết.'}`
          }]);
        } else {
          const geminiText = await getGeminiResponse(message);
          setChat(prev => [...prev, { sender: 'bot', text: `🤖 Trợ lý AI: ${geminiText}` }]);
        }
      
      } else if (intent === "top_rated") {
        values = await fetchAllProducts();
        values = values.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
        setChat(prev => [...prev, { sender: 'bot', text: '🌟 Đây là các sản phẩm được đánh giá cao nhất:' }]);
        setProducts(values);

      } else if (intent === "best_seller") {
        values = await fetchAllProducts();
        values = values.sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 5);
        setChat(prev => [...prev, { sender: 'bot', text: '🔥 Đây là các sản phẩm bán chạy nhất:' }]);
        setProducts(values);
      }

      setProducts(values);
    } catch (err) {
      console.error('ChatBox error:', err);
      setChat(prev => [...prev, { sender: 'bot', text: '❗ Lỗi hệ thống. Vui lòng thử lại sau.' }]);
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
          <button className="chat-button" onClick={() => {
            setChat(prev => [...prev, { sender: 'user', text: 'Tôi muốn kiểm tra đơn hàng' }]);
            setExpanded(true);
            setMessage('Tôi muốn kiểm tra đơn hàng');
            setTimeout(() => sendMessage(), 300);
          }}>Kiểm tra đơn hàng</button>
          <button className="chat-button" onClick={() => {
            setChat(prev => [...prev, { sender: 'user', text: 'Tôi muốn liên hệ nhân viên' }]);
            setExpanded(true);
            setMessage('Tôi muốn liên hệ nhân viên');
            setTimeout(() => sendMessage(), 300);
          }}>Liên hệ nhân viên</button>
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

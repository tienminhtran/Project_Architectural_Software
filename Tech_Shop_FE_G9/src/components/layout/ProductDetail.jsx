import React, { useEffect, useState, useRef } from "react";
import "../../assets/css/ProductDetail.css";
import { FaCheckCircle } from "react-icons/fa";


// Hàm kiểm tra ảnh có tồn tại không
const tryImageExtensions = async (basePath, extensions = [".jpeg", ".jpg", ".png", ".webp", "jfif"]) => {
  for (const ext of extensions) {
    const fullPath = `${basePath}${ext}`;
    try {
      const res = await fetch(fullPath, { method: "HEAD" });
      if (res.ok) return fullPath;
    } catch (e) {
      console.error(`Error fetching ${fullPath}:`, e);
    }
  }
  return null;
};

// Component đếm ngược Flash Sale
const FlashSaleTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      setTimeLeft(distance > 0 ? distance : 0);

      if (distance <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (time) => String(time).padStart(2, "0");
  const hours = formatTime(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = formatTime(Math.floor((timeLeft / (1000 * 60)) % 60));
  const seconds = formatTime(Math.floor((timeLeft / 1000) % 60));

  return (
    <div className="flash-sale-countdown">
      <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
    </div>
  );
};

const ProductDetail = () => {
  const [thumbUrls, setThumbUrls] = useState([]);
  const endTimeRef = useRef(new Date().getTime() + 4 * 60 * 60 * 1000); // Giữ cố định thời gian kết thúc

  useEffect(() => {
    const loadThumbnails = async () => {
      const thumbs = [];
      for (let i = 1; i <= 4; i++) {
        const basePath = `/images/product/${i}`;
        const url = await tryImageExtensions(basePath);
        thumbs.push(url || "/images/product/default-thumb.jpg");
      }
      setThumbUrls(thumbs);
    };

    loadThumbnails();
  }, []);

  return (
    <div className="productdetail__container">
      {/* Hình ảnh sản phẩm */}
      <div className="productdetail__image-group">
        <img src="/images/product/iphone-14-pro-max.jpg" alt="MSI Thin 15" className="productdetail__main-image" />
        <div className="productdetail__thumbnail-group">
          {thumbUrls.map((thumbUrl, index) => (
            <img key={index} src={thumbUrl} alt={`Thumbnail ${index + 1}`} className="productdetail__thumbnail" />
          ))}
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div>
        <h1 className="productdetail__title">Laptop gaming MSI Thin 15 B13UC 2044VN</h1>
        <p className="productdetail__rating">⭐ 5.0 • Xem đánh giá</p>

        {/* Flash Sale */}
        <div className="flash-sale-box">
          <div className="flash-sale-header">
            <span className="flash-sale-title">⚡ FLASH SALE</span>
            <span className="flash-sale-countdown-label">Kết thúc trong</span>
            <FlashSaleTimer endTime={endTimeRef.current} />
          </div>
          <div className="flash-sale-body">
            <span className="price-new">19.290.000₫</span>
            <span className="price-old">19.490.000₫</span>
            <span className="discount-box">-1%</span>
          </div>
        </div>

        <button className="productdetail__buy-button">
                MUA NGAY 
                <br></br>
        Giao tận nơi hoặc nhận tại cửa hàng
        </button>

        <div className="space-y-2 mt-4">
          <p className="productdetail__gift-title">Quà tặng:</p>
          <ul className="productdetail__gift-list">
            <li>🎁 Balo MSI Essential Backpack (Kèm máy)</li>
            <li>✔️ Bảo hành chính hãng 24 tháng</li>
            <li>✔️ Hỗ trợ đổi mới trong 7 ngày</li>
            <li>✔️ Miễn phí giao hàng toàn quốc</li>
          </ul>
        </div>

        <div className="productdetail__installment-info">
          Hỗ trợ trả tiền MPOS (Thẻ tín dụng), HDSAISON <span>Xem chi tiết</span>.
        </div>

        <div className="productdetail__extra-deals">
          <h6>Khuyến mãi</h6>
          <p><FaCheckCircle style={{color: '#1D9811' }}/> Giảm ngay 100.000đ khi mua Microsoft Office kèm Laptop. <span>Xem thêm</span></p>
          <p><FaCheckCircle style={{color: '#1D9811' }}/> Ưu đãi 500.000đ khi nâng cấp RAM với Laptop Gaming. <span>Xem thêm</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

import React from "react";
import { FaTags, FaCheckCircle  , FaHandHoldingUsd, FaChessQueen } from "react-icons/fa";

const HomeOffers = () => {
  const sections = [
    {
      title: " STUDENT PREMIUM",
      icon: <FaChessQueen className="brand-icon" style={{backgroundColor: "#ff4d9d", color: "#fff", width: "30px", height: "auto", padding: "5px", borderRadius: "50%"}} />,
      images: [
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2025.jpg",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2-0-slide-ipad.jpg",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2-0-slide--laptop.jpg",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2-0-slide-samsung.png",
      ],
    },
    {
      title: " PAYMENT OFFERS",
      icon: <FaHandHoldingUsd className="brand-icon" style={{backgroundColor: "#ff4d9d", color: "#fff", width: "30px", height: "auto", padding: "5px", borderRadius: "50%"}} />,
      images: [
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/hsbc-16-e.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/keido.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/uu-dai-mpos-01-04.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/vitebank-09-04.png",
      ],
    },
    {
      title: " TECH NEWS",
      icon: <FaCheckCircle className="brand-icon" style={{backgroundColor: "#ff4d9d", color: "#fff", width: "30px", height: "auto", padding: "5px", borderRadius: "50%"}} />,
      articles: [
        {
          title: "So sánh iPhone 16 vs 15 Pro",
          img: "https://cdn-media.sforum.vn/storage/app/media/maithuong/so-sanh-iphone-13-pro-max-va-iphone-14-pro-max-cover.jpg",
        },
        {
          title: "Đánh giá Lenovo Legion Pro 7i",
          img: "https://cdn-media.sforum.vn/storage/app/media/trannghia/trannghia/so-sanh-iphone-16-vs-15-pro-cover.jpg",
        },
        {
          title: "Samsung Galaxy Z Fold7 khi nào ra?",
          img: "https://cdn-media.sforum.vn/storage/app/media/haianh/danh-gia-lenovo-legion-pro-7i-thumb.jpg",
        },
        {
          title: "Màn hình MSI QD-OLED 500Hz",
          img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/uu-dai-mpos-01-04.png",
        },
      ],
    },
  ];

  return (
    <div style={{  width: "100%" }}>
      {sections.map((section, idx) => (
        <div key={idx} style={{ marginBottom: "30px" }}>
          <h3 style={{ fontWeight: "700", marginBottom: "15px" }}>
            <div>
                <h2 style={{color: "#ff4d9d", fontSize: "18px", fontWeight: "600", marginBottom: "8px"}}>
                    {section.icon} {section.title}
                </h2>
            </div>
          </h3>
          {section.images && (
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {section.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Offer"
                  style={{
                    width: "23.5%",
                    height: "120px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          )}

          <hr style={{ margin: "20px 0", border: "1px solid #ddd" }} />

          
          {section.articles && (
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "20px" }}>
              {section.articles.map((article, i) => (
                <div
                  key={i}
                  style={{
                    width: "23.5%",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={article.img}
                    alt={article.title}
                    style={{ width: "100%", height: "120px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "10px", fontSize: "14px", fontWeight: "500" }}>
                    {article.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeOffers;

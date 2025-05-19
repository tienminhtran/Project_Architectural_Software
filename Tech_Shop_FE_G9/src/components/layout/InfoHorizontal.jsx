import React from 'react';
import '../../assets/css/InfoHorizontal.css';

const InfoHorizontal = () => {
  return (
    <div className="info-container " style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', padding: '30px 20px', borderTop: '2px solid #ddd', backgroundColor: '#FFFFFF', borderRadius: '8px 8px 0 0', boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)', transition: 'background-color 0.3s ease'}}>
      {/* Các box ưu đãi */}
      <div className="info-box">
        <img src="/images/icon/icon1.png" alt="Ship COD" />
        <p>Ship COD trên toàn Quốc<br/>Miễn phí giao hàng nội thành</p>
      </div>
      <div className="info-box">
        <img src="/images/icon/icon2.png" alt="Giá tốt" />
        <p>Giá bán ra luôn tốt nhất<br/>Cam kết hàng chính hãng</p>
      </div>
      <div className="info-box">
        <img src="/images/icon/icon3.png" alt="Trả góp" />
        <p>Hỗ trợ Trả góp lãi suất thấp<br/>Hồ sơ đơn giản, nhận máy nhanh</p>
      </div>
      <div className="info-box">
        <img src="/images/icon/icon4.png" alt="Bảo hành" />
        <p>Bảo hành trọn đời MIỄN PHÍ<br/>Vệ sinh máy định kỳ</p>
      </div>
    </div>
  );
};

export default InfoHorizontal;

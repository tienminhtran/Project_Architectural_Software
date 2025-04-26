import React from 'react';
import '../../assets/css/InfoHorizontal.css';

const InfoHorizontal = () => {
  return (
    <div className="info-container ">
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
        <p>Bảo hành trọn đời MIỄN PHÍ<br/>Vệ sinh máy định kỳ, cài đặt phần mềm</p>
      </div>

      {/* Các nhân viên kinh doanh */}
    </div>
  );
};

export default InfoHorizontal;

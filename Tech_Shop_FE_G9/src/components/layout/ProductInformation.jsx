import React, { useState } from 'react';
import '../../../src/assets/css/ProductInformation.css';

const ProductInformation = ({product}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="productinfo__container">
      <div className="productinfo__left">
        <h2>Thông tin sản phẩm</h2>
        <h3>Thông số kĩ thuật:</h3>
        <table className="productinfo__table table table-bordered table-striped">
          <tbody>
            <tr>
              <th>CPU</th>
              <td>{product?.cpu || 'Chưa có thông tin'}</td>
            </tr>
            <tr>
              <th>RAM</th>
              <td>{product?.ram || 'Chưa có thông tin'}</td>
            </tr>

            {isExpanded && (
              <>
                <tr>
                  <th>Monitor</th>
                  <td>
                    {product?.monitor}
                  </td>
                </tr>

                <tr>
                  <th>Hệ điều hành</th>
                  <td>{product?.os || 'Chưa có thông tin'}</td>
                </tr>

                <tr>
                  <th>Cổng port</th>
                  <td>{product?.port || 'Chưa có thông tin'}</td>
                </tr>

                <tr>
                  <th>VGA</th>
                  <td>
                    {product?.graphicCard}<br />
                    Up to 1172.5MHz Boost Clock 45W Maximum Graphics Power
                  </td>
                </tr>

                <tr>
                  <th>Battery</th>
                  <td>
                    {product?.battery}                
                  </td>
                </tr>
                
                <tr>
                  <th>RearCamera</th>
                  <td>
                    {product?.rearCamera}
                  </td>
                </tr>

                <tr>
                  <th>FrontCamera</th>
                  <td>
                    {product?.frontCamera}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {/* Hiệu ứng đổ bóng */}
        <div className={`productinfo__shadow ${isExpanded ? 'productinfo__shadow--hidden' : ''}`} />
        {!isExpanded && <div className="productinfo__shadow" />}
        <p className="productinfo__toggle" onClick={handleToggle}>
          {isExpanded ? 'Thu gọn ▲' : 'Đọc tiếp bài viết ▼'}
        </p>
      </div>

      <div className="productinfo__right">
        <h2>Tin tức về công nghệ</h2>
        <ul className="productinfo__news">
          <li><img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s25-home-moi.png" alt="" /> Bỏ túi cách lấy nick Tiktok cũ bằng ID siêu đơn giản, ai cũng làm được</li>
          <li><img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/tivi-xiaomi-new.jpg" alt="" /> Hướng dẫn sử dụng Shakker AI tạo ảnh AI chi tiết trong vài bước</li>
          <li><img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iphone-16-pro-max-thu-cu-moi-home.jpg" alt="" /> Reminder là gì? 7 app nhắc nhở công việc hằng ngày hiệu quả</li>
          <li><img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/m4-len-doi-tang-airpods-4.jpg" alt="" /> Tổng hợp FULL code Combat Warriors mới nhất tháng 04/2025</li>
          <li><img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/asus.jpg"alt="" /> Blox Fruits Stock là gì? Mẹo thêm Blox Fruits Stock vào Discord Server</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInformation;

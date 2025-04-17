import React, { useState } from 'react';
import '../../../src/assets/css/ProductInformation.css';

const ProductInformation = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="productinfo__container">
      <div className="productinfo__left">
        <h2>Thông tin sản phẩm</h2>
        <h3>Thông số kĩ thuật:</h3>
        <table className="productinfo__table">
          <tbody>
            <tr>
              <th>CPU</th>
              <td>Intel Core i7-13620H (3.6GHz~4.9GHz) 10 Nhân 16 Luồng</td>
            </tr>
            <tr>
              <th>RAM</th>
              <td>16GB (2 x 8GB) DDR4 3200MHz (2x SO-DIMM socket, up to 64GB SDRAM)</td>
            </tr>

            {isExpanded && (
              <>
            <tr>
              <th>RAM</th>
              <td>16GB (2 x 8GB) DDR4 3200MHz (2x SO-DIMM socket, up to 64GB SDRAM)</td>
            </tr>
            <tr>
              <th>RAM</th>
              <td>16GB (2 x 8GB) DDR4 3200MHz (2x SO-DIMM socket, up to 64GB SDRAM)</td>
            </tr>
            <tr>
              <th>RAM</th>
              <td>16GB (2 x 8GB) DDR4 3200MHz (2x SO-DIMM socket, up to 64GB SDRAM)</td>
            </tr>
            <tr>
              <th>RAM</th>
              <td>16GB (2 x 8GB) DDR4 3200MHz (2x SO-DIMM socket, up to 64GB SDRAM)</td>
            </tr>
                <tr>
                  <th>Ổ cứng</th>
                  <td>SSD NVMe PCIe 512GB Gen4x4 (1 khe)</td>
                </tr>
                <tr>
                  <th>VGA</th>
                  <td>
                    NVIDIA® GeForce RTX™ 3050 Laptop GPU<br />
                    Up to 1172.5MHz Boost Clock 45W Maximum Graphics Power
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
          <li><img src="../../../public/images/product/oppo-a38-black-1.jpeg" alt="" /> Bỏ túi cách lấy nick Tiktok cũ bằng ID siêu đơn giản, ai cũng làm được</li>
          <li><img src="../../../public/images/product/oppo-a38-black-1.jpeg" alt="" /> Hướng dẫn sử dụng Shakker AI tạo ảnh AI chi tiết trong vài bước</li>
          <li><img src="../../../public/images/product/oppo-a38-black-1.jpeg" alt="" /> Reminder là gì? 7 app nhắc nhở công việc hằng ngày hiệu quả</li>
          <li><img src="../../../public/images/product/oppo-a38-black-1.jpeg" alt="" /> Tổng hợp FULL code Combat Warriors mới nhất tháng 04/2025</li>
          <li><img src="../../../public/images/product/oppo-a38-black-1.jpeg"alt="" /> Blox Fruits Stock là gì? Mẹo thêm Blox Fruits Stock vào Discord Server</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInformation;

import React, { useState } from 'react';
import { FaFilter, FaAngleDown, FaTimesCircle } from "react-icons/fa";
import '../../../../src/assets/css/FindProduct.css';

export default function ShopProduct() {
  const [openFilter, setOpenFilter] = useState(null);
  const [showAllFilters, setShowAllFilters] = useState(false);

  const handleFilterClick = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
    setShowAllFilters(false);
  };

  // Giá
  const [min, setMin] = useState(11690000);
  const [max, setMax] = useState(41490000);
  const minValue = 10000000;
  const maxValue = 50000000;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(value)
      .replace('₫', 'đ');

  const handleMinChange = (e) => setMin(Math.min(Number(e.target.value), max));
  const handleMaxChange = (e) => setMax(Math.max(Number(e.target.value), min));
  const resetRange = () => {
    setMin(minValue);
    setMax(maxValue);
  };

  // Bộ lọc
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const categoryFilters = prev[category] || [];
      const newFilters = categoryFilters.includes(value)
        ? categoryFilters.filter((item) => item !== value)
        : [...categoryFilters, value];

      const updated = { ...prev, [category]: newFilters };
      if (newFilters.length === 0) delete updated[category];
      return updated;
    });
  };

  const renderFilterItems = (category, options) => (
    options.map((option, index) => (
      <li
        key={index}
        className={`shop-product__filter-option-item ${selectedFilters[category]?.includes(option) ? 'selected' : ''}`}
        onClick={() => toggleFilter(category, option)}
      >
        {option}
      </li>
    ))
  );

  return (
    <div>
      <div className="shop-product__filter-bar">
        <button
          className={`shop-product__filter-button ${showAllFilters ? 'active' : ''}`}
          onClick={() => {
            setShowAllFilters(!showAllFilters);
            setOpenFilter(null);
          }}
        >
          <FaFilter /> Bộ lọc
        </button>

        {/* Tình trạng sản phẩm */}
        <div className="shop-product__filter-wrapper">
          <button
            className={`shop-product__filter-button ${openFilter === "Tình trạng sản phẩm" ? 'active' : ''}`}
            onClick={() => handleFilterClick("Tình trạng sản phẩm")}
          >
            Tình trạng sản phẩm <FaAngleDown />
          </button>
          {openFilter === "Tình trạng sản phẩm" && !showAllFilters && (
            <div className="shop-product__filter-dropdown shop-product__individual">
              <ul className="shop-product__filter-option">
                <li className="shop-product__filter-option-item">Hết hàng</li>
                <li className="shop-product__filter-option-item">Còn hàng</li>
              </ul>
            </div>
          )}
        </div>

        {/* Hãng */}
        <div className="shop-product__filter-wrapper">
          <button
            className={`shop-product__filter-button ${openFilter === "Hãng" ? 'active' : ''}`}
            onClick={() => handleFilterClick("Hãng")}
          >
            Hãng <FaAngleDown />
          </button>
          {openFilter === "Hãng" && !showAllFilters && (
            <div className="shop-product__filter-dropdown shop-product__individual">
              <ul className="shop-product__filter-option">
                <li className="shop-product__filter-option-item">ASUS</li>
                <li className="shop-product__filter-option-item">HP</li>
                <li className="shop-product__filter-option-item">Dell</li>
                <li className="shop-product__filter-option-item">Không thương hiệu</li>
              </ul>
            </div>
          )}
        </div>

        {/* CPU */}
        <div className="shop-product__filter-wrapper">
          <button
            className={`shop-product__filter-button ${openFilter === "CPU" ? 'active' : ''}`}
            onClick={() => handleFilterClick("CPU")}
          >
            CPU <FaAngleDown />
          </button>
          {openFilter === "CPU" && !showAllFilters && (
            <div className="shop-product__filter-dropdown shop-product__individual">
              <ul className="shop-product__filter-option">
                <li className="shop-product__filter-option-item">AMD Ryzen 5</li>
                <li className="shop-product__filter-option-item">AMD Ryzen 7</li>
                <li className="shop-product__filter-option-item">Intel Core i5</li>
                <li className="shop-product__filter-option-item">Intel Core i7</li>
              </ul>
            </div>
          )}
        </div>

        {/* Kích thước màn hình */}
        <div className="shop-product__filter-wrapper">
          <button
            className={`shop-product__filter-button ${openFilter === "size" ? 'active' : ''}`}
            onClick={() => handleFilterClick("size")}
          >
            Kích thước <FaAngleDown />
          </button>
          {openFilter === "size" && !showAllFilters && (
            <div className="shop-product__filter-dropdown shop-product__individual">
              <ul className="shop-product__filter-option">
                <li className="shop-product__filter-option-item">14 inch</li>
                <li className="shop-product__filter-option-item">15.6 inch</li>
                <li className="shop-product__filter-option-item">17 inch</li>
              </ul>
            </div>
          )}
        </div>

        {/* Giá */}
        <div className="shop-product__filter-wrapper">
          <button
            className={`shop-product__filter-button ${openFilter === "price" ? 'active' : ''}`}
            onClick={() => handleFilterClick("price")}
          >
            Giá <FaAngleDown />
          </button>
          {openFilter === "price" && !showAllFilters && (
            <div className="shop-product__filter-dropdown shop-product__individual">
              <div className="shop-product__price-range">
                <div className="shop-product__price-inputs">
                  <input type="text" value={formatCurrency(min)} readOnly />
                  <input type="text" value={formatCurrency(max)} readOnly />
                </div>
                <div className="shop-product__range-sliders">
                  <input type="range" min={minValue} max={maxValue} value={min} onChange={handleMinChange} />
                  <input type="range" min={minValue} max={maxValue} value={max} onChange={handleMaxChange} />
                </div>
                <div className="shop-product__range-buttons">
                  <button onClick={resetRange} className="shop-product__reset-button">Bỏ chọn</button>
                  <button className="shop-product__submit-button">Xem kết quả</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bộ lọc toàn phần */}
      {showAllFilters && (
        <div className="shop-product__filter-dropdown shop-product__full">
          {/* Hiển thị các tiêu chí đã chọn */}
          {Object.keys(selectedFilters).length > 0 && (
          <div className="shop-product__selected-filters">
              <strong>Tiêu chí đã chọn:</strong>
              {Object.entries(selectedFilters).map(([category, values]) =>
                values.map((value, idx) => (
                  <span key={`${category}-${idx}`} className="shop-product__selected-filter">
                    {category}: {value}
                    <button onClick={() => toggleFilter(category, value)}><FaTimesCircle size={12} /></button>
                  </span>
                ))
              )}
            </div>
          )}
          <div className="shop-product__full-wrapper">
            <div>
              <strong>Tình trạng sản phẩm</strong>
              <ul>{renderFilterItems("Tình trạng sản phẩm", ["Hết hàng", "Còn hàng"])}</ul>

              <strong>Giá</strong>
              <div className="shop-product__price-range">
                <div className="shop-product__price-inputs">
                  <input type="text" value={formatCurrency(min)} readOnly />
                  <input type="text" value={formatCurrency(max)} readOnly />
                </div>
                <div className="shop-product__range-sliders">
                  <input type="range" min={minValue} max={maxValue} value={min} onChange={handleMinChange} />
                  <input type="range" min={minValue} max={maxValue} value={max} onChange={handleMaxChange} />
                </div>
              </div>
            </div>
            <div>
              <strong>Hãng</strong>
              <ul>{renderFilterItems("Hãng", ["ASUS", "HP", "Dell", "Không thương hiệu"])}</ul>

              <strong>CPU</strong>
              <ul>{renderFilterItems("CPU", ["AMD Ryzen 5", "AMD Ryzen 7", "Intel Core i5", "Intel Core i7"])}</ul>

              <strong>Kích thước màn hình</strong>
              <ul>{renderFilterItems("Kích thước màn hình", ["14 inch", "15.6 inch", "17 inch"])}</ul>
            </div>

            <div>
              <strong>Nhu cầu sử dụng</strong>
              <ul>{renderFilterItems("Nhu cầu sử dụng", ["Gaming", "Văn phòng"])}</ul>
              <strong>RAM</strong>
              <ul>{renderFilterItems("RAM", ["8 GB", "16 GB", "32 GB"])}</ul>
              <strong>SSD</strong>
              <ul>{renderFilterItems("SSD", ["512 GB", "1 TB"])}</ul>
              <strong>VGA</strong>
              <ul>{renderFilterItems("VGA", ["RTX 3050", "RTX 3060", "RTX 3070Ti", "AMD Radeon"])}</ul>
            </div>
          </div>
          <div className="shop-product__range-buttons">
            <button onClick={resetRange} className="shop-product__reset-button">Bỏ chọn</button>
            <button className="shop-product__submit-button">Xem kết quả</button>
          </div>
        </div>
      )}
    </div>
  );
}

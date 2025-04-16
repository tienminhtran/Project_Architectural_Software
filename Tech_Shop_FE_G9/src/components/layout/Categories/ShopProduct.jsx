import React, { useState } from 'react';
import '../../../../src/assets/css/ShopProduct.css';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaGetPocket } from 'react-icons/fa';

const filterOptions = {
  "Tình trạng sản phẩm": ["Hết hàng", "Còn hàng"],
  "Giá": ["Dưới 10 triệu", "10-20 triệu", "Trên 20 triệu"],
  "Hãng": ["ASUS", "HP", "Dell", "Không thương hiệu"],
  "CPU": ["AMD Ryzen 5", "AMD Ryzen 7", "Intel Core i5", "Intel Core i7"],
  "Kích thước màn hình": ["14 inch", "15.6 inch", "17 inch"],
  "Nhu cầu sử dụng": ["Gaming", "Văn phòng"],
  "RAM": ["8 GB", "16 GB", "32 GB"],
  "SSD": ["512 GB", "1 TB"],
  "VGA": ["RTX 3050", "RTX 3060", "RTX 3070Ti", "AMD Radeon"]
};

export default function ShopProduct() {
  const [openFilter, setOpenFilter] = useState(null); // store open filter name
  const [showAllFilters, setShowAllFilters] = useState(false); // for "Bộ lọc" toggle

  const handleFilterClick = (filterName) => {
    if (openFilter === filterName) {
      setOpenFilter(null); // toggle off
    } else {
      setOpenFilter(filterName); // open specific filter
      setShowAllFilters(false); // hide "show all filters"
    }
  };

  return (
    <div>
      <div className="filter-bar">
        <button
          className={`filter-button ${showAllFilters ? 'active' : ''}`}
          onClick={() => {
            setShowAllFilters(!showAllFilters);
            setOpenFilter(null); // close any individual filter when showing all
          }}
        >
           Bộ lọc
        </button>

        {Object.keys(filterOptions).map((filterName) => (
          <button
            key={filterName}
            className={`filter-button ${openFilter === filterName ? 'active' : ''}`}
            onClick={() => handleFilterClick(filterName)}
          >
            {filterName} ⌄
          </button>
        ))}
      </div>

      {/* All filters open (when "Bộ lọc" is clicked) */}
      {showAllFilters && (
        <div className="filter-dropdown" style={{ position: 'relative', zIndex: 100 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '16px' }}>
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category}>
                <strong>{category}</strong>
                <div className="filter-option">
                  {options.map((option) => (
                    <div className="filter-option-item" key={option}>
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Individual dropdown */}
      {openFilter && !showAllFilters && (
        <div className="filter-dropdown">
          <div className="filter-option">
            {filterOptions[openFilter].map((option) => (
              <div className="filter-option-item" key={option}>
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

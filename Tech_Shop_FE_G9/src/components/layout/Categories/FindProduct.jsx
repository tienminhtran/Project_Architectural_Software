import React, { useState } from 'react';
import { FaFilter, FaAngleDown, FaTimesCircle } from "react-icons/fa";
import '../../../../src/assets/css/FindProduct.css';
import useProduct from '../../../hooks/useProduct';
import { formatPrice } from '../../../utils/FormatPrice';

export default function FindProduct({categoryId, filterProduct, productsCategory}) {
  const [openFilter, setOpenFilter] = useState(null);
  const [showAllFilters, setShowAllFilters] = useState(false);  

  const handleFilterClick = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
    setShowAllFilters(false);
  };

  // Attrribute
  const cpus = productsCategory?.slice(0,6).map((item) => item.cpu);
  // console.log("cpus", cpus);
  const cpusUnique = [...new Set(cpus)];

  const brands = productsCategory?.slice(0,6).map((item) => item.brand.name);
  const brandsUnique = [...new Set(brands)];

  const monitors = productsCategory?.slice(0,6).map((item) => item.monitor);
  const monitorsUnique = [...new Set(monitors)];

  const rams = productsCategory?.slice(0,6).map((item) => item.ram);
  const ramsUnique = [...new Set(rams)];

  const vga = productsCategory?.slice(0,6).map((item) => item.graphicCard);
  const vgaUnique = [...new Set(vga)];

  // Giá
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const minValue = 10000000;
  const maxValue = 50000000;

  const handleMinChange = (e) => setMin(Math.min(Number(e.target.value), max));
  const handleMaxChange = (e) => setMax(Math.max(Number(e.target.value), min));
  const resetFilter = () => {
    setMin(0);
    setMax(0);
    setSelectedFilters({});
    setSelectedStock({});
  };

  // isStock
  const [isStock, setIsStock] = useState();
  const [selectedStock, setSelectedStock] = useState({});
  console.log("selectedStock", selectedStock);
  const handleStockClick = (key,value) => {
    setIsStock(value);
    if(key === "het") { 
      setSelectedStock((prev) => ({
        ...prev,
        [key]: value,
        con: false,
      }));
    }
    setSelectedStock((prev) => ({
      ...prev,
      [key]: value,
      het: value,
    }));
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

  const handleFilterProduct = () => {
    // const inStock =  selectedFilters['Tình trạng sản phẩm'] ? selectedFilters['Tình trạng sản phẩm']?.includes('Còn hàng') ? true : false : null;
    console.log("InStock", isStock);
    const filterRequest = {
      categoryId,
      minPrice: min,
      maxPrice: max,
      brands: selectedFilters['Brand'] || [],
      cpus: selectedFilters['CPU'] || [],
      monitors: selectedFilters['Monitor'] || [],
      graphicCards: selectedFilters['VGA'] || [],
      rams: selectedFilters['RAM'] || [],
      inStock: isStock,
    };
    filterProduct({ filterRequest });
  };

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
            <div className="shop-product__individual">
              <ul className="shop-product__filter-option">
                <li
                  className={`shop-product__filter-option-item ${selectedStock["het"] === false  ? 'selected' : ''}`}
                  onClick={() => handleStockClick("het",false)}
                >
                  Hết hàng
                </li>
                <li
                  className={`shop-product__filter-option-item ${selectedStock['con'] ? 'selected' : ''}`}
                  onClick={() => handleStockClick("con",true)}
                >
                  Còn hàng
                </li>
              </ul>
              <div className="shop-product__range-button">
                  <button onClick={resetFilter} className="shop-product__reset-button">Bỏ chọn</button>
                  <button className="shop-product__submit-button" onClick={handleFilterProduct}>Xem kết quả</button>
                </div>
            </div>
          )}
        </div>

        {/* Hãng */}
        <div className="shop-product__filter-wrapper">
          <button
            className={`shop-product__filter-button ${openFilter === "Brand" ? 'active' : ''}`}
            onClick={() => handleFilterClick("Brand")}
          >
            Hãng <FaAngleDown />
          </button>
          {openFilter === "Brand" && !showAllFilters && (
            <div className="shop-product__individual">
              <ul className="shop-product__filter-option">            
                {renderFilterItems("Brand", brandsUnique)}
              </ul>
              <div className="shop-product__range-button">
                  <button onClick={resetFilter} className="shop-product__reset-button">Bỏ chọn</button>
                  <button className="shop-product__submit-button" onClick={handleFilterProduct}>Xem kết quả</button>
                </div>
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
            <div className="shop-product__individual">
              <ul className="shop-product__filter-option">
                {renderFilterItems("CPU", cpusUnique)}
              </ul>
              <div className="shop-product__range-button">
                  <button onClick={resetFilter} className="shop-product__reset-button">Bỏ chọn</button>
                  <button className="shop-product__submit-button" onClick={handleFilterProduct}>Xem kết quả</button>
                </div>
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
            <div className="shop-product__individual">
              <ul className="shop-product__filter-option">
                 {renderFilterItems("Monitor", monitorsUnique)}
              </ul>
              <div className="shop-product__range-button">
                  <button onClick={resetFilter} className="shop-product__reset-button">Bỏ chọn</button>
                  <button className="shop-product__submit-button" onClick={handleFilterProduct}>Xem kết quả</button>
                </div>
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
            <div className="shop-product__individual">
              <div className="shop-product__price-range">
                <div className="shop-product__price-inputs">
                  <input type="text" value={formatPrice(min)} readOnly />
                  <input type="text" value={formatPrice(max)} readOnly />
                </div>
                <div className="shop-product__range-sliders">
                  <input type="range" min={minValue} max={maxValue} value={min} onChange={handleMinChange} />
                  <input type="range" min={minValue} max={maxValue} value={max} onChange={handleMaxChange} />
                </div>
                <div className="shop-product__range-button">
                  <button onClick={resetFilter} className="shop-product__reset-button">Bỏ chọn</button>
                  <button className="shop-product__submit-button" onClick={handleFilterProduct}>Xem kết quả</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bộ lọc toàn phần */}
      {showAllFilters && (
        <div className="shop-product__full">
          {/* Hiển thị các tiêu chí đã chọn */}
          {Object.keys(selectedFilters).length > 0 && (
          <div className="shop-product__selected-filters">
              <strong>Tiêu chí đã chọn:</strong>
              {Object.entries(selectedFilters).map(([category, values]) =>
                values.map((value, idx) => (
                  <span key={`${category}-${idx}`} className="shop-product__selected-filter">
                    {category}: {value}
                    <button onClick={() => toggleFilter(category, value)}><FaTimesCircle size={24} style={{border: '1px solid #90caf9', borderRadius:'60%', backgroundColor:'#ed1a44' }} /></button>
                  </span>
                ))
              )}
            </div>
          )}
          <div className="shop-product__full-wrapper">
            <div>
              <strong>Tình trạng sản phẩm</strong>
              <ul className="shop-product__filter-option">
                <li
                  className={`shop-product__filter-option-item ${selectedStock["het"] === false  ? 'selected' : ''}`}
                  onClick={() => handleStockClick("het",false)}
                >
                  Hết hàng
                </li>
                <li
                  className={`shop-product__filter-option-item ${selectedStock['con'] ? 'selected' : ''}`}
                  onClick={() => handleStockClick("con",true)}
                >
                  Còn hàng
                </li>
              </ul>

              <strong>Giá</strong>
              <div className="shop-product__price-range">
                <div className="shop-product__price-inputs">
                  <input type="text" value={formatPrice(min)} readOnly />
                  <input type="text" value={formatPrice(max)} readOnly />
                </div>
                <div className="shop-product__range-sliders">
                  <input type="range" min={minValue} max={maxValue} value={min} onChange={handleMinChange} />
                  <input type="range" min={minValue} max={maxValue} value={max} onChange={handleMaxChange} />
                </div>
              </div>
            </div>

            <div>
              <strong>Hãng</strong>
              <ul className="shop-product__filter-option">{renderFilterItems("Brand", brandsUnique)}</ul>

              <strong>CPU</strong>
              <ul className="shop-product__filter-option">{renderFilterItems("CPU", cpusUnique)}</ul>

              <strong>Kích thước màn hình</strong>
              <ul className="shop-product__filter-option">{renderFilterItems("Monitor", monitorsUnique)}</ul>
            </div>

            <div>
              
              <strong>RAM</strong>
              <ul className="shop-product__filter-option">{renderFilterItems("RAM", ramsUnique)}</ul>
              {/* <strong>SSD</strong>
              <ul>{renderFilterItems("SSD", ["512 GB", "1 TB"])}</ul> */}
              {vgaUnique.includes("N/A") ? null : (
                <>
                  <strong>VGA</strong>
                  <ul className="shop-product__filter-option">{renderFilterItems("VGA", vgaUnique)}</ul>
                </>
                
              )}
            </div>
            <div className="shop-product__range-buttons">
              <button onClick={resetFilter} className="shop-product__reset-button">Bỏ chọn</button>
              <button className="shop-product__submit-button" onClick={handleFilterProduct}>Xem kết quả</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

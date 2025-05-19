import React, { useState, useEffect, useRef } from "react";
import useProduct from "../../hooks/useProduct";

const styles = {
  searchContainer: {
    position: "relative",
    width: "620px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  searchInput: {
    width: "100%",
    padding: "10px 15px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  searchInputFocus: {
    borderColor: "#007bff",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
  },
  productList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    maxHeight: "300px",
    overflowY: "auto",
    marginTop: "5px",
    padding: 0,
    listStyle: "none",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "0 0 8px 8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  productItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    borderBottom: "1px solid #eee",
  },
  productItemHover: {
    backgroundColor: "#f0f8ff",
  },
  productThumb: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "6px",
    marginRight: "15px",
    flexShrink: 0,
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  productInfo: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    fontWeight: 600,
    fontSize: "16px",
    color: "#333",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  productPrice: {
    marginTop: "4px",
    color: "#007bff",
    fontWeight: 700,
  },
  productPriceContact: {
    color: "#888",
    fontStyle: "italic",
    fontWeight: "normal",
  },
};

const ProductSearchDropdown = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { findProduct, foundProduct, setFoundProduct } = useProduct();
  const dropdownRef = useRef(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim()) {
        findProduct(searchTerm.trim());
      } else {
        setFoundProduct([]);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm, findProduct, setFoundProduct]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFoundProduct([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setFoundProduct]);

  return (
    <div style={styles.searchContainer} ref={dropdownRef}>
      <input
        type="text"
        placeholder="Tìm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          ...styles.searchInput,
          ...(inputFocused ? styles.searchInputFocus : {}),
        }}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      {foundProduct.length > 0 && (
        <ul style={styles.productList}>
          {foundProduct.map((product, index) => (
            <li
              key={product.id}
              style={{
                ...styles.productItem,
                ...(hoveredIndex === index ? styles.productItemHover : {}),
                borderBottom:
                  index === foundProduct.length - 1 ? "none" : styles.productItem.borderBottom,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <img
                src={product.thumbnail}
                alt={product.productName}
                style={styles.productThumb}
              />
              <div style={styles.productInfo}>
                <div style={styles.productName}>{product.productName}</div>
                {/* description */}
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {product.description.length > 50
                    ? `${product.description.slice(0, 50)}...`
                    : product.description}
                </div>
                <div style={styles.productPrice}>
                  {product.price ? (
                    <strong>{product.price.toLocaleString()} đ</strong>
                  ) : (
                    <em style={styles.productPriceContact}>Liên hệ</em>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearchDropdown;

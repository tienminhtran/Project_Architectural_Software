import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [setFoundProduct]);

  const handleProductClick = (product) => {
    navigate(`/product/${btoa(product.id)}`, { state: { product } });
    setSearchTerm(""); // Clear search input
    setFoundProduct([]); // Hide dropdown
  };

  return (
    <div style={styles.searchContainer} ref={dropdownRef}>
      <input
        type="text"
        placeholder="Tìm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setInputFocused(true)}
        style={{
          ...styles.searchInput,
          ...(inputFocused ? styles.searchInputFocus : {}),
        }}
      />

      {foundProduct.length > 0 && (
        <ul style={styles.productList}>
          {foundProduct.map((product, index) => (
            <li
              key={product.id}
              style={{
                ...styles.productItem,
                ...(hoveredIndex === index ? styles.productItemHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.thumbnail}
                alt={product.productName}
                style={styles.productThumb}
              />
              <div style={styles.productInfo}>
                <span style={styles.productName}>{product.productName}</span>
                <span style={styles.productPrice}>
                  {product.price ? `${product.price} ₫` : <span style={styles.productPriceContact}>Liên hệ</span>}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearchDropdown;

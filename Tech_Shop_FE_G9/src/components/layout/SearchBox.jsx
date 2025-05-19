import React, { useState, useEffect, useRef } from "react";
import useProduct from "../../hooks/useProduct";
import "../../assets/css/ProductSearchDropdown.css";

const ProductSearchDropdown = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { findProduct, foundProduct, setFoundProduct } = useProduct();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm.trim()) {
                findProduct(searchTerm.trim());
            } else {
                setFoundProduct([]);
            }
        }, 400);
        return () => clearTimeout(timeout);
    }, [searchTerm, findProduct, setFoundProduct]); // Thêm dependencies

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setFoundProduct([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setFoundProduct]); // Thêm dependency

    return (
        <div className="search-container" ref={dropdownRef}>
            <input
                type="text"
                placeholder="Tìm sản phẩm..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "600px" }}
            />
            {foundProduct.length > 0 && (
                <ul className="product-list">
                    {foundProduct.map((product) => (
                        <li key={product.id} className="product-item">
                            <img
                                src={product.thumbnail}
                                alt={product.productName}
                                className="product-thumb"
                            />
                            <div className="product-info">
                                <div className="product-name">{product.productName}</div>
                                <div className="product-price">
                                    {product.price ? (
                                        <strong>{product.price.toLocaleString()} đ</strong>
                                    ) : (
                                        <em>Liên hệ</em>
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
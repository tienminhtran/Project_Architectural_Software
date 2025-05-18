import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import "../../../../../src/assets/css/ProductCategoriesPhone.css"; 
import { useNavigate } from "react-router-dom";
import { filterProductPhone } from "../../../../services/productService";

const ProductCategories = ({ products }) => {
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại (0-indexed)
  const [pageSize] = useState(8); // Số sản phẩm mỗi trang

  // Tính tổng số trang
  const totalPages = Math.ceil(products.length / pageSize);

  // Cắt sản phẩm của trang hiện tại
  const currentProducts = products.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
   

      <div className="product-user-phone__product-container">
         
        {products.length > 0 ? (
          <>
            <div className="product-user-phone__product-grid">
              {currentProducts.map((product, index) => (
                <button
                  className="product-user-phone__product-card"
                  key={index}
                  onClick={() => navigate(`/product/${btoa(product.id)}`, { state: { product } })}
                >
                  <div className="product-user-phone__product-img-wrapper">
                    <img src={product.thumbnail} alt={product.name} className="product-user-phone__product-img" />
                    <span className="product-user-phone__product-discount">{product.discount} OFF</span>
                    <div className="product-user-phone__product-actions">
                      <button
                        className="product-user-phone__icon-btn-love"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Clicked love icon");
                        }}
                      >
                        <FaHeart />
                      </button>
                      <button
                        className="product-user-phone__icon-btn-eye"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Clicked eye icon");
                        }}
                      >
                        <FaEye />
                      </button>
                    </div>
                  </div>
                  <div className="product-user-phone__product-info">
                    <h5>{product.name}</h5>
                    <p>
                      <span className="product-user-phone__price-new">{product.price} ₫</span>{" "}
                      <del className="product-user-phone__price-old">{product.oldPrice} ₫</del>
                    </p>
                    <ul className="product-user-phone__product-specs">
                      <li>RAM: {product.ram}</li>
                      <li>Màn hình: {product.monitor}</li>
                      <li>Pin: {product.battery}</li>
                      <li>Hệ điều hành: {product.os}</li>
                    </ul>
                    <button
                      className="product-user-phone__add-to-cart"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Added to cart");
                      }}
                    >
                      <FaShoppingCart /> Thêm giỏ hàng
                    </button>
                  </div>
                </button>
              ))}
            </div>

            
            <div className="product-user-phone__pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={currentPage === index ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </div>
           </>
        ) : (

            <h2 className="text-center">Không có sản phẩm nào</h2>
        )}
       
      </div>

  );
};

export default ProductCategories;

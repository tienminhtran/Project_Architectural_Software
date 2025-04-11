import React from "react";
import { FaBars, FaChevronDown, FaShoppingCart, FaUser,FaHeart,FaEye} from "react-icons/fa";
import "../../../src/assets/css/HeaderUser.css";
const ProductUser = () => {
    // data Product
    const productData = [
      {
        name: "Dell G15",
        image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
        newPrice: "15.000.000",
        oldPrice: "18.000.000",
      },
      {
        name: "HP ProBook",
        image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
        newPrice: "12.000.000",
        oldPrice: "14.400.000",
      },      
      {
        name: "HP ProBook",
        image: "../../../public/images/product/oppo-a38-black-1.jpeg",
        newPrice: "12.000.000",
        oldPrice: "14.400.000",
      },
      {
        name: "HP ProBook",
        image: "../../../public/images/product/samsung-galaxy-z-flip6.jpg",
        newPrice: "12.000.000",
        oldPrice: "14.400.000",
      },
    ];

  return (
        <div className="container-fluid py-3">
          <div className="header-user__products">
              <h2>
                  <FaShoppingCart className="header-user__products-icon" /> Our Products
              </h2>
              <h1>Explore our Products</h1>
          </div>

          {/* container product */}
          <div className="row">
            {productData.map((product, index) => (
              <div className="col-md-3" key={index}>
                <div className="header-user__product-card">
                  <div className="header-user__product-image-wrapper">
                    <img src={product.image} alt={product.name} className="header-user__product-img" />
                    <div className="header-user__badge">20% Off</div>

                    {/* Hover Actions */}
                    <div className="header-user__product-actions">
                      <button className="header-user__View">
                        <FaEye />
                      </button>
                      <button className="header-user__add-to-cart">
                        <FaShoppingCart /> Thêm giỏ hàng
                      </button>
                      <button className="header-user__favorite">
                        <FaHeart />
                      </button>
                    </div>
                  </div>

                  <div className="header-user__product-info">
                    <p className="header-user__product-name">{product.name}</p>
                    <p className="header-user__product-price">
                      <span className="header-user__new-price">{product.newPrice} ₫</span>{" "}
                      <span className="header-user__old-price">{product.oldPrice} ₫</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

  );
};

export default ProductUser;

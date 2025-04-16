import React from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaEye,
} from "react-icons/fa";
import "../../../../../src/assets/css/ProductCategoriesPhone.css"; 

const ProductCategoriesPhone = () => {
  const productData = [
    {
      name: "iPhone 14 Pro Max",
      image: "../../../public/images/product/iphone-14-pro-max.jpg",
      newPrice: "26.990.000",
      oldPrice: "30.990.000",
      discount: "13%",
      battery: "4323mAh",
      monitor: "6.7 inch",
      os: "iOS 17",
      ram: "6GB",
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
      newPrice: "28.490.000",
      oldPrice: "31.990.000",
      discount: "11%",
      battery: "5000mAh",
      monitor: "6.8 inch",
      os: "Android 14",
      ram: "12GB",
    },
    {
      name: "Xiaomi 13T Pro",
      image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
      newPrice: "15.990.000",
      oldPrice: "18.490.000",
      discount: "14%",
      battery: "5000mAh",
      monitor: "6.67 inch",
      os: "Android 13",
      ram: "12GB",
    },
    {
      name: "OPPO Find N3 Flip",
      image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
      newPrice: "21.990.000",
      oldPrice: "24.990.000",
      discount: "12%",
      battery: "4300mAh",
      monitor: "6.8 inch",
      os: "Android 14",
      ram: "12GB",
    },
    {
      name: "Realme 12 Pro+",
      image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
      newPrice: "11.990.000",
      oldPrice: "13.990.000",
      discount: "14%",
      battery: "5000mAh",
      monitor: "6.7 inch",
      os: "Android 14",
      ram: "8GB",
    },
    {
      name: "Google Pixel 8",
      image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
      newPrice: "17.990.000",
      oldPrice: "20.490.000",
      discount: "12%",
      battery: "4575mAh",
      monitor: "6.2 inch",
      os: "Android 14",
      ram: "8GB",
    },{
        name: "Xiaomi 13T Pro",
        image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
        newPrice: "15.990.000",
        oldPrice: "18.490.000",
        discount: "14%",
        battery: "5000mAh",
        monitor: "6.67 inch",
        os: "Android 13",
        ram: "12GB",
      },
      {
        name: "OPPO Find N3 Flip",
        image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
        newPrice: "21.990.000",
        oldPrice: "24.990.000",
        discount: "12%",
        battery: "4300mAh",
        monitor: "6.8 inch",
        os: "Android 14",
        ram: "12GB",
      },
      {
        name: "Realme 12 Pro+",
        image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
        newPrice: "11.990.000",
        oldPrice: "13.990.000",
        discount: "14%",
        battery: "5000mAh",
        monitor: "6.7 inch",
        os: "Android 14",
        ram: "8GB",
      },
      {
        name: "Google Pixel 8",
        image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
        newPrice: "17.990.000",
        oldPrice: "20.490.000",
        discount: "12%",
        battery: "4575mAh",
        monitor: "6.2 inch",
        os: "Android 14",
        ram: "8GB",
      },{
        name: "Xiaomi 13T Pro",
        image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
        newPrice: "15.990.000",
        oldPrice: "18.490.000",
        discount: "14%",
        battery: "5000mAh",
        monitor: "6.67 inch",
        os: "Android 13",
        ram: "12GB",
      },
      {
        name: "OPPO Find N3 Flip",
        image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
        newPrice: "21.990.000",
        oldPrice: "24.990.000",
        discount: "12%",
        battery: "4300mAh",
        monitor: "6.8 inch",
        os: "Android 14",
        ram: "12GB",
      },
      {
        name: "Realme 12 Pro+",
        image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
        newPrice: "11.990.000",
        oldPrice: "13.990.000",
        discount: "14%",
        battery: "5000mAh",
        monitor: "6.7 inch",
        os: "Android 14",
        ram: "8GB",
      },
      {
        name: "Google Pixel 8",
        image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
        newPrice: "17.990.000",
        oldPrice: "20.490.000",
        discount: "12%",
        battery: "4575mAh",
        monitor: "6.2 inch",
        os: "Android 14",
        ram: "8GB",
      },
  ];

//   const brands = ["Apple", "Samsung", "Xiaomi", "OPPO", "Vivo", "Realme", "Nokia"];

  return (
    <div className="product-user-phone__product-container">
      {/* <div className="product-user-phone__product-header">
        <h2>
          <FaShoppingCart className="product-user-phone__products-icon" /> Our Products Phone
        </h2>
        <div className="brand-list">
          {brands.map((brand, index) => (
            <h2 key={index} className="brand-item">
              {brand}
            </h2>
          ))}
          <a href="/all" className="see-all">
            <h2>Xem tất cả</h2>
          </a>
        </div>
      </div> */}

      <div className="product-user-phone__product-grid">
        {productData.map((product, index) => (
          <div className="product-user-phone__product-card" key={index}>
            <div className="product-user-phone__product-img-wrapper">
              <img src={product.image} alt={product.name} className="product-user-phone__product-img" />
              <span className="product-user-phone__product-discount">{product.discount} OFF</span>
              <div className="product-user-phone__product-actions">
                <button className="product-user-phone__icon-btn-love"><FaHeart /></button>
                <button className="product-user-phone__icon-btn-eye"><FaEye /></button>
              </div>
            </div>
            <div className="product-user-phone__product-info">
              <h5>{product.name}</h5>
              <p>
                <span className="product-user-phone__price-new">{product.newPrice} ₫</span>{" "}
                <del className="product-user-phone__price-old">{product.oldPrice} ₫</del>
              </p>
              <ul className="product-user-phone__product-specs">
                <li>RAM: {product.ram}</li>
                <li>Màn hình: {product.monitor}</li>
                <li>Pin: {product.battery}</li>
                <li>Hệ điều hành: {product.os}</li>
              </ul>
              <button className="product-user-phone__add-to-cart">
                <FaShoppingCart /> Thêm giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoriesPhone;

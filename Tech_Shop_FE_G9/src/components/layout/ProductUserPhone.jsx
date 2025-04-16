import React, { useRef, useEffect } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "../../../src/assets/css/ProductUser.css";

const ProductUser = () => {
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
    },
  ];
  

  const brands = [ "Apple", "Samsung", "Xiaomi", "OPPO", "Vivo", "Realme", "Nokia"];


  const scrollRef = useRef();

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Auto scroll 3s mỗi lần sang phải
    const interval = setInterval(() => {
      handleScroll("right");
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Sau mỗi 30s kiểm tra scroll có đang ở cuối chưa, nếu rồi thì quay về đầu
    const interval = setInterval(() => {
      const { current } = scrollRef;
      if (current) {
        if (current.scrollLeft + current.offsetWidth >= current.scrollWidth - 5) {
          current.scrollLeft = 0;
        } else {
          current.scrollLeft += 350;
        }
      }
    }, 30000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="product-user__product-container">
      <div className="product-user__product-header">
        <h2>
          <FaShoppingCart className="product-user__products-icon" /> Our Products Phone
        </h2>
        <div className="brand-list">
            {brands.map((brand, index) => (
              <h2 key={index} className="brand-item">
                {brand}
              </h2>
            ))}
            <a href="/all" className="see-all"> <h2>Xem tất cả</h2> </a>
        </div>
      </div>

      <button className="product-user__scroll-btn product-user__scroll-left" onClick={() => handleScroll("left")}>
        <FaAngleDoubleLeft size={24} />
      </button>

      <div className="product-user__product-scroll" ref={scrollRef}>
        {productData.map((product, index) => (
          <div className="product-user__product-card" key={index}>
            <div className="product-user__product-img-wrapper">
              <img src={product.image} alt={product.name} className="product-user__product-img" />
              <span className="product-user__product-discount">{product.discount} OFF</span>
              <div className="product-user__product-actions">
                <button className="product-user__icon-btn-love"><FaHeart /></button>
                <button className="product-user__icon-btn-eye"><FaEye /></button>
              </div>
            </div>

            <div className="product-user__product-info">
              <h5>{product.name}</h5>
              <p>
                <span className="product-user__price-new">{product.newPrice} ₫</span>{" "}
                <del className="product-user__price-old">{product.oldPrice} ₫</del>
              </p>
              <ul className="product-user__product-specs">
                <li>RAM: {product.ram}</li>
                <li>Màn hình: {product.monitor}</li>
                <li>Pin: {product.battery}</li>
                <li>Hệ điều hành: {product.os}</li>
              </ul>
              <button className="product-user__add-to-cart">
                <FaShoppingCart /> Thêm giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="product-user__scroll-btn product-user__scroll-right" onClick={() => handleScroll("right")}>
        <FaAngleDoubleRight size={24} />
      </button>
    </div>
  );
};

export default ProductUser;

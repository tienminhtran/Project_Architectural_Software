import React, { useRef, useEffect } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "../../../src/assets/css/ProductUser.css";
import { useNavigate } from "react-router-dom";

const ProductUser = () => {
  const navigate = useNavigate();
  const productData = [
    // Chuột máy tính
    {
      name: "Logitech G102",
      image: "../../../public/images/product/mouse1.jpg",
      newPrice: "450.000",
      oldPrice: "600.000",
      discount: "25%",
    },
    {
      name: "Razer DeathAdder Essential",
      image: "../../../public/images/product/mouse2.jpg",
      newPrice: "790.000",
      oldPrice: "990.000",
      discount: "20%",
    },
    {
      name: "Fuhlen G90",
      image: "../../../public/images/product/mouse3.jpg",
      newPrice: "520.000",
      oldPrice: "650.000",
      discount: "20%",
    },

    // Bàn phím
    {
      name: "Akko 3068B Multi-mode",
      image: "../../../public/images/product/keyboard1.jpg",
      newPrice: "1.500.000",
      oldPrice: "1.800.000",
      discount: "17%",
    },
    {
      name: "Logitech K380",
      image: "../../../public/images/product/keyboard2.jpg",
      newPrice: "680.000",
      oldPrice: "850.000",
      discount: "20%",
    },
    {
      name: "Keychron K2 V2",
      image: "../../../public/images/product/keyboard3.jpg",
      newPrice: "1.900.000",
      oldPrice: "2.300.000",
      discount: "17%",
    },
  ];

  const brands = [
    "AKKO",
    "ASUS",
    "Cooler Master",
    "Corsair",
    "DareU",
    "E-Dra",
    "Glorious",
  ];

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
        if (
          current.scrollLeft + current.offsetWidth >=
          current.scrollWidth - 5
        ) {
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
          <FaShoppingCart className="product-user__products-icon" /> Our
          Products Laptop
        </h2>
        <div className="brand-list">
          {brands.map((brand, index) => (
            <h2 key={index} className="brand-item">
              {brand}
            </h2>
          ))}
          <a href="/categories-all-accessory" className="see-all">
            {" "}
            <h2>Xem tất cả</h2>{" "}
          </a>
        </div>
      </div>

      <button
        className="product-user__scroll-btn product-user__scroll-left"
        onClick={() => handleScroll("left")}
      >
        <FaAngleDoubleLeft size={24} />
      </button>

      <div className="product-user__product-scroll" ref={scrollRef}>
        {productData.map((product, index) => (
          <div
            className="product-user__product-card"
            key={index}
            onClick={() => navigate("/1")}
          >
            <div className="product-user__product-img-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-user__product-img"
              />
              <span className="product-user__product-discount">
                {product.discount} OFF
              </span>

              <div className="product-user__product-actions">
                <button
                  className="product-user__icon-btn-love"
                  onClick={(e) => {
                    e.stopPropagation(); // Ngừng sự kiện lan ra ngoài
                    console.log("Đã thêm yêu thích:", product.name);
                    // TODO: Xử lý thêm yêu thích sản phẩm
                  }}
                >
                  <FaHeart />
                </button>

                <button
                  className="product-user__icon-btn-eye"
                  onClick={(e) => {
                    e.stopPropagation(); // Ngừng sự kiện lan ra ngoài
                    console.log("Xem nhanh sản phẩm:", product.name);
                    // TODO: Mở modal xem nhanh sản phẩm
                  }}
                >
                  <FaEye />
                </button>
              </div>
            </div>

            <div className="product-user__product-info">
              <h5>{product.name}</h5>
              <p>
                <span className="product-user__price-new">
                  {product.newPrice} ₫
                </span>{" "}
                <del className="product-user__price-old">
                  {product.oldPrice} ₫
                </del>
              </p>
              <button
                className="product-user__add-to-cart"
                onClick={(e) => {
                  e.stopPropagation(); // Ngừng sự kiện lan ra ngoài
                  console.log("Đã thêm vào giỏ hàng:", product.name);
                  // TODO: Xử lý thêm giỏ hàng
                }}
              >
                <FaShoppingCart /> Thêm giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="product-user__scroll-btn product-user__scroll-right"
        onClick={() => handleScroll("right")}
      >
        <FaAngleDoubleRight size={24} />
      </button>
    </div>
  );
};

export default ProductUser;

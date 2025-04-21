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
import { filterProductLaptop } from "../../services/productService";

// const productData = [
//   {
//     name: "Dell G15",
//     image: "../../../public/images/product/laptop1.jpg",
//     newPrice: "15.000.000",
//     oldPrice: "18.000.000",
//     discount: "20%",
//     battery: "60000mAh",
//     monitor: "15.6 inch",
//     os: "Windows 10",
//     ram: "16GB",
//   },
//   {
//     name: "HP ProBook",
//     image: "../../../public/images/product/laptop2.jpg",
//     newPrice: "12.000.000",
//     oldPrice: "14.400.000",
//     discount: "17%",
//     battery: "50000mAh",
//     monitor: "14 inch",
//     os: "Windows 11",
//     ram: "8GB",
//   },
//   {
//     name: "Dell G15",
//     image: "../../../public/images/product/laptop3.jpg",
//     newPrice: "15.000.000",
//     oldPrice: "18.000.000",
//     discount: "20%",
//     battery: "60000mAh",
//     monitor: "15.6 inch",
//     os: "Windows 10",
//     ram: "16GB",
//   },
//   {
//     name: "HP ProBook",
//     image: "../../../public/images/product/laptop4.jpg",
//     newPrice: "12.000.000",
//     oldPrice: "14.400.000",
//     discount: "17%",
//     battery: "50000mAh",
//     monitor: "14 inch",
//     os: "Windows 11",
//     ram: "8GB",
//   },
//   {
//     name: "Dell G15",
//     image: "../../../public/images/product/laptop2.jpg",
//     newPrice: "15.000.000",
//     oldPrice: "18.000.000",
//     discount: "20%",
//     battery: "60000mAh",
//     monitor: "15.6 inch",
//     os: "Windows 10",
//     ram: "16GB",
//   },
//   {
//     name: "HP ProBook",
//     image: "../../../public/images/product/laptop3.jpg",
//     newPrice: "12.000.000",
//     oldPrice: "14.400.000",
//     discount: "17%",
//     battery: "50000mAh",
//     monitor: "14 inch",
//     os: "Windows 11",
//     ram: "8GB",
//   },
//   {
//     name: "Dell G15",
//     image: "../../../public/images/product/laptop1.jpg",
//     newPrice: "15.000.000",
//     oldPrice: "18.000.000",
//     discount: "20%",
//     battery: "60000mAh",
//     monitor: "15.6 inch",
//     os: "Windows 10",
//     ram: "16GB",
//   },
//   {
//     name: "HP ProBook",
//     image: "../../../public/images/product/laptop3.jpg",
//     newPrice: "12.000.000",
//     oldPrice: "14.400.000",
//     discount: "17%",
//     battery: "50000mAh",
//     monitor: "14 inch",
//     os: "Windows 11",
//     ram: "8GB",
//   },
// ];

const ProductUser = () => {
  const navigate = useNavigate();
  
  const [products, setProducts] = React.useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await filterProductLaptop();
        // console.log("products", response);
        setProducts(response.response); // Giả sử response.content chứa danh sách sản phẩm
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const brands = ["ASUS", "ACER", "MSI", "LENOVO", "GIGABYTE", "DELL"];


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
          <FaShoppingCart className="product-user__products-icon" /> Our Products Laptop
        </h2>
        <div className="brand-list">
            {brands.map((brand, index) => (
              <h2 key={index} className="brand-item">
                {brand}
              </h2>
            ))}
            <a href="/categories-all-laptop" className="see-all"> <h2>Xem tất cả</h2> </a>
        </div>
      </div>

      <button className="product-user__scroll-btn product-user__scroll-left" onClick={() => handleScroll("left")}>
        <FaAngleDoubleLeft size={24} />
      </button>

    <div className="product-user__product-scroll" ref={scrollRef}>
      {products?.map((product, index) => (
        <div
          className="product-user__product-card"
          key={index}
          onClick={() => navigate('/1')}
        >
          <div className="product-user__product-img-wrapper">
            <img
              src={product.thumbnail}
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
                  e.stopPropagation(); // Chặn click lan ra ngoài
                  console.log("Đã thêm yêu thích:", product.productName);
                  // TODO: Gọi API hoặc set state yêu thích
                }}
              >
                <FaHeart />
              </button>

              <button
                className="product-user__icon-btn-eye"
                onClick={(e) => {
                  e.stopPropagation(); // Chặn click lan ra ngoài
                  console.log("Xem nhanh sản phẩm:", product.productName);
                  // TODO: Mở modal xem nhanh
                }}
              >
                <FaEye />
              </button>
            </div>
          </div>

          <div className="product-user__product-info">
            <h5>{product.productName}</h5>
            <p>
              <span className="product-user__price-new">
                {product.price} ₫
              </span>{' '}
              <del className="product-user__price-old">
                {product.oldPrice} ₫
              </del>
            </p>
            <ul className="product-user__product-specs">
              <li>RAM: {product.ram}</li>
              <li>Màn hình: {product.monitor}</li>
              <li>Pin: {product.battery}</li>
              <li>Hệ điều hành: {product.os}</li>
            </ul>
            <button
              className="product-user__add-to-cart"
              onClick={(e) => {
                e.stopPropagation(); // Chặn click lan ra ngoài
                console.log("Đã thêm vào giỏ hàng:", product.productName);
                // TODO: Xử lý thêm giỏ hàng
              }}
            >
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

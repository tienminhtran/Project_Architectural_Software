import React, { useRef, useEffect } from "react";
import "../../assets/css/ProductsYouViewed.css";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaGetPocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductUser = () => {
    const navigate = useNavigate();
  
  const scrollRef = useRef(null);

  const productData = [
    {
      name: "Dell G15",
      image: "https://file.hstatic.net/200000722513/file/layout_web_-09_d2c2f20ee0af491b8bf40d032ff74dbf.png",
      newPrice: "15.000.000",
      oldPrice: "18.000.000",
      discount: "20%",
    },
    {
      name: "HP ProBook",
      image: "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-08.png",
      newPrice: "12.000.000",
      oldPrice: "14.400.000",
      discount: "20%",

    },
    {
      name: "HP ProBook",
      image: "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-07.png",
      newPrice: "12.000.000",
      oldPrice: "14.400.000",
      discount: "10%",

    },
    {
      name: "HP ProBook",
      image: "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-06.png",
      newPrice: "12.000.000",
      oldPrice: "14.400.000",
      discount: "20%",

    }, 
    {
        name: "Dell G15",
        image: "https://product.hstatic.net/200000722513/product/lenovo_v14_g4_iru_ct1_09_cec3749729ee42f3ab1b318c2348639e_1024x1024.png",
        newPrice: "15.000.000",
        oldPrice: "18.000.000",
        discount: "20%",
      },
      {
        name: "HP ProBook",
        image: "https://product.hstatic.net/200000722513/product/1024_5b3ad2cff4444235bdb9897806ebbc40_1024x1024.png",
        newPrice: "12.000.000",
        oldPrice: "14.400.000",
        discount: "20%",
  
      },
      {
        name: "HP ProBook",
        image: "https://product.hstatic.net/200000722513/product/1024_5b3ad2cff4444235bdb9897806ebbc40_1024x1024.png",
        newPrice: "12.000.000",
        oldPrice: "14.400.000",
        discount: "10%",
  
      },
      {
        name: "HP ProBook",
        image: "https://product.hstatic.net/200000722513/product/thumbchuot_319f928f991a4303a119531a028fca35_caa118908bcb4634847506512cb92ce8_1024x1024.png",
        newPrice: "12.000.000",
        oldPrice: "14.400.000",
        discount: "20%",
  
      }, 
  ];

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") current.scrollLeft -= 250;
    else current.scrollLeft += 250;
  };

//   const getDiscount = (oldPrice, newPrice) => {
//     const oldP = parseInt(oldPrice.replace(/\./g, ""));
//     const newP = parseInt(newPrice.replace(/\./g, ""));
//     const percent = Math.round(((oldP - newP) / oldP) * 100);
//     return `-${percent}%`;
//   };
    useEffect(() => {
      const interval = setInterval(() => {
        const { current } = scrollRef;
        if (current) {
          // Nếu đã scroll đến gần cuối, quay về đầu
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
    <div className="products-viewed">
    <div className="products-viewed__products">
        <h2>
            <FaGetPocket className="products-viewed__products-icon" /> Sản phẩm đã xem
        </h2>
    </div>
    <div className="products-viewed__products-container-wrapper">
  {/* Nút cuộn trái */}
  <button className="products-viewed__scroll-btn left" onClick={() => handleScroll("left")}>
    <FaAngleDoubleLeft size={24} />
  </button>

  {/* Danh sách sản phẩm */}
  <div className="products-viewed__products-container" ref={scrollRef}>
    {productData.map((product, index) => (
      <button
        className="products-viewed__product-card"
        key={index}
        onClick={() => navigate('/1')}
      >
        <img src={product.image} alt={product.name} />
        <h4>{product.name}</h4>
        <div className="products-viewed__prices">
          <span className="products-viewed__old">{product.oldPrice}đ</span>
          <span className="products-viewed__new">{product.newPrice}đ</span>
        </div>
        <div className="products-viewed__discount">{product.discount}</div>
      </button>
    ))}
  </div>

  {/* Nút cuộn phải */}
  <button className="products-viewed__scroll-btn right" onClick={() => handleScroll("right")}>
    <FaAngleDoubleRight size={24} />
  </button>
</div>











    </div>
  );
};

export default ProductUser;

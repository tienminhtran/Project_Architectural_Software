import React, { useRef } from "react";
import "../../../src/assets/css/ProductsYouViewed.css";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaGetPocket } from "react-icons/fa";

const ProductUser = () => {
  const scrollRef = useRef(null);

  const productData = [
    {
      name: "Dell G15",
      image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
      newPrice: "15.000.000",
      oldPrice: "18.000.000",
      discount: "20%",
    },
    {
      name: "HP ProBook",
      image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
      newPrice: "12.000.000",
      oldPrice: "14.400.000",
      discount: "20%",

    },
    {
      name: "HP ProBook",
      image: "../../../public/images/product/oppo-a38-black-1.jpeg",
      newPrice: "12.000.000",
      oldPrice: "14.400.000",
      discount: "10%",

    },
    {
      name: "HP ProBook",
      image: "../../../public/images/product/samsung-galaxy-z-flip6.jpg",
      newPrice: "12.000.000",
      oldPrice: "14.400.000",
      discount: "20%",

    }, 
    {
        name: "Dell G15",
        image: "../../../public/images/product/samsung-galaxy-z-flip6-2.jpg",
        newPrice: "15.000.000",
        oldPrice: "18.000.000",
        discount: "20%",
      },
      {
        name: "HP ProBook",
        image: "../../../public/images/product/iphone-12-1-2-750x500.jpg",
        newPrice: "12.000.000",
        oldPrice: "14.400.000",
        discount: "20%",
  
      },
      {
        name: "HP ProBook",
        image: "../../../public/images/product/oppo-a38-black-1.jpeg",
        newPrice: "12.000.000",
        oldPrice: "14.400.000",
        discount: "10%",
  
      },
      {
        name: "HP ProBook",
        image: "../../../public/images/product/samsung-galaxy-z-flip6.jpg",
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

  return (
    <div className="products-viewed">
    <div className="products-viewed__products">
        <h2>
            <FaGetPocket className="products-viewed__products-icon" /> Products you viewed
        </h2>
    </div>
      <div className="products-viewed__products-container-wrapper">
        <button className="products-viewed__scroll-btn left" onClick={() => handleScroll("left")}>
          <FaAngleDoubleLeft />
        </button>
        <div className="products-viewed__products-container" ref={scrollRef}>
          {productData.map((product, index) => (
            <div className="products-viewed__product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <div className="products-viewed__prices">
                <span className="products-viewed__old">{product.oldPrice}đ</span>
                <span className="products-viewed__new">{product.newPrice}đ</span>
              </div>
              <div className="products-viewed__discount">{product.discount}</div>
            </div>
          ))}
        </div>
        <button className="products-viewed__scroll-btn right" onClick={() => handleScroll("right")}>
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default ProductUser;

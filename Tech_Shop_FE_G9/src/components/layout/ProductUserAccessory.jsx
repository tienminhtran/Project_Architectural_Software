import React, { useRef, useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "../../../src/assets/css/ProductUser.css";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../services/authService";
import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";
import { toast } from "react-toastify";
import { filterProductByCategory } from "../../services/productService";
import { formatPrice } from "../../utils/FormatPrice";

const ACCESSORY_CATEGORY_ID = "3"; // Thay bằng category id thực tế nếu cần

const ProductUserAccessory = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addWishlistItem } = useWishlist();
  const token = getAccessToken();

  const [accessoryProducts, setAccessoryProducts] = useState([]);

  // Lấy sản phẩm theo category phụ kiện khi mount
  useEffect(() => {
    const fetchAccessoryProducts = async () => {
      try {
        const res = await filterProductByCategory(ACCESSORY_CATEGORY_ID);
        if (Array.isArray(res?.response)) {
          setAccessoryProducts(res.response);
        } else {
          setAccessoryProducts([]);
        }
      } catch (error) {
        setAccessoryProducts([]);
      }
    };
    fetchAccessoryProducts();
  }, []);

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddtoCart = (product) => {
    try {
      const request = {
        id_product: product?.id,
        quantity: 1,
      };
      if (!token) {
        navigate("/login");
        return;
      }
      addItem(request);
      toast.success("Đã thêm vào giỏ hàng ", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Thêm vào giỏ hàng thất bại", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Hàm xử lý thêm sản phẩm vào danh sách yêu thích
  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    if (!token) {
      navigate("/login");
      return;
    }
    addWishlistItem.mutate(
      { id_product: product?.id },
      {
        onSuccess: () => {
          toast.success("Đã thêm vào danh sách yêu thích!", {
            position: "top-right",
            autoClose: 1500,
          });
        },
        onError: () => {
          toast.warn("Sản phẩm đã có trong danh sách yêu thích!", {
            position: "top-right",
            autoClose: 1500,
          });
        },
      }
    );
  };

  useEffect(() => {
    // Sau khi fetch xong
    console.log("Dữ liệu sản phẩm phụ kiện từ API:", accessoryProducts);
  }, [accessoryProducts]);

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
          <FaShoppingCart className="product-user__products-icon" /> Phụ kiện
        </h2>
        <div className="brand-list">
          {brands.map((brand, index) => (
            <h2 key={index} className="brand-item">
              {brand}
            </h2>
          ))}
          <a href="/categories-all-accessory" className="see-all">
            <h2>Xem tất cả</h2>
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
        {accessoryProducts.length > 0 ? (
          accessoryProducts.map((product, index) => (
            <div
              className="product-user__product-card"
              key={index}
              onClick={() => navigate(`/product/${btoa(product.id)}`)}
            >
              <div className="product-user__product-img-wrapper">
                <img
                  src={product.thumbnail}
                  alt={product.productName}
                  className="product-user__product-img"
                />
                <span className="product-user__product-discount">
                  {product.discount} OFF
                </span>

                <div className="product-user__product-actions">
                  <button
                    className="product-user__icon-btn-love"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWishlist(e, product);
                    }}
                  >
                    <FaHeart />
                  </button>

                  <button
                    className="product-user__icon-btn-eye"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Xem nhanh sản phẩm:", product.name);
                      // TODO: Mở modal xem nhanh sản phẩm
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
                    {formatPrice(Number(product.price))}
                  </span>{" "}
                  <del className="product-user__price-old">
                    {formatPrice(Number(product.price) + 200000)}
                  </del>
                </p>
                <button
                  className="product-user__add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddtoCart(product);
                  }}
                >
                  <FaShoppingCart /> Thêm giỏ hàng
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: 40, textAlign: "center" }}>
            Không có sản phẩm nào để hiển thị.
          </div>
        )}
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

export default ProductUserAccessory;

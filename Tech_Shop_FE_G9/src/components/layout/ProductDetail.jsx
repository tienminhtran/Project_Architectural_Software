import React, { useEffect, useState, useRef } from "react";
import "../../assets/css/ProductDetail.css";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/FormatPrice";
import useCart from "../../hooks/useCart";
import { filterProductByCategory } from "../../services/productService";



const ACCESSORY_CATEGORY_ID = "3"; // giống như bên ProductUserAccessory


// Hàm kiểm tra ảnh có tồn tại không
const tryImageExtensions = async (basePath, extensions = [".jpeg", ".jpg", ".png", ".webp", "jfif"]) => {
  for (const ext of extensions) {
    const fullPath = `${basePath}${ext}`;
    try {
      const res = await fetch(fullPath, { method: "HEAD" });
      if (res.ok) return fullPath;
    } catch (e) {
      console.error(`Error fetching ${fullPath}:`, e);
    }
  }
  return null;
};

// Component đếm ngược Flash Sale
const FlashSaleTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      setTimeLeft(distance > 0 ? distance : 0);

      if (distance <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (time) => String(time).padStart(2, "0");
  const hours = formatTime(Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = formatTime(Math.floor((timeLeft / (1000 * 60)) % 60));
  const seconds = formatTime(Math.floor((timeLeft / 1000) % 60));

  return (
    <div className="flash-sale-countdown">
      <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
    </div>
  );
};

const ProductDetail = ({product}) => {
  const navigate = useNavigate();
  const [thumbUrls,setThumbUrls] = useState([]);
  const endTimeRef = useRef(new Date().getTime() + 4 * 60 * 60 * 1000); // Giữ cố định thời gian kết thúc

  console.log("product", product);

  const { addItem } = useCart(); 


  useEffect(() => {
    const loadThumbnails = async () => {
      const thumbs = [];
      for (let i = 1; i <= 4; i++) {
        const basePath = `/images/product/${i}`;
        const url = await tryImageExtensions(basePath);
        thumbs.push(url || "/images/product/default-thumb.jpg");
      }
      setThumbUrls(thumbs);
    };

    loadThumbnails();
  }, []);

  const handleRatingStar = (ratings) => {
    let star = 0;
    ratings.forEach((rating) => {
      star += rating.star;
    });
    return (star / ratings.length).toFixed(1);
  }
  const handleAddToCart = (product) => {
    try {
      const request = {
        id_product: product?.id,
        quantity: 1
      };
      addItem(request);

      selectedItems.forEach((itemId) => {
        const selected = accessoryProducts.find((item) => item.id === itemId);
        if (selected) {
          const accessoryRequest = {
            id_product: selected.id,
            quantity: 1,
          };
          addItem(accessoryRequest);
        }
      });
      navigate("/cart", { state: { product_id: product?.id, accessory_ids : selectedItems } });

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };



  //ProductRecommendation

    const [selectedItems, setSelectedItems] = useState([]);
    const [accessoryProducts, setAccessoryProducts] = useState([]);
    
    console.log("Sản phẩm kèm theo", accessoryProducts);
  
    // Lấy sản phẩm theo category phụ kiện khi mount
    console.log("ACCESSORY_CATEGORY_ID", ACCESSORY_CATEGORY_ID);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await filterProductByCategory(ACCESSORY_CATEGORY_ID);
          if (Array.isArray(res?.response)) {
            setAccessoryProducts(res.response);
          } else {
            setAccessoryProducts([]);
          }
        } catch (err) {
          console.error("Lỗi khi lấy sản phẩm phụ kiện:", err);
          setAccessoryProducts([]);
        }
      };
  
      fetchData();
    }, []);
  
    const toggleSelect = (id) => {
      setSelectedItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };
  

    
  return (
    <div>
            <div className="productdetail__container">
        {/* Hình ảnh sản phẩm */}
        <div className="productdetail__image-group">
          <img src={product?.thumbnail || "/images/product/avtdefault.jpg"} alt="MSI Thin 15" className="productdetail__main-image" />
          <div className="productdetail__thumbnail-group">
            {product?.images.map((thumbUrl, index) => (
              <img key={index} src={thumbUrl} alt={`Thumbnail ${index + 1}`} className="productdetail__thumbnail" />
            ))}
          </div>
        </div>

        
        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="productdetail__title">{product?.productName}</h1>
          <p className="productdetail__rating">⭐ {handleRatingStar(product?.ratings)} • Xem đánh giá</p>

          {/* Flash Sale */}
          <div className="flash-sale-box">
            <div className="flash-sale-header">
              <span className="flash-sale-title">⚡ FLASH SALE</span>
              <span className="flash-sale-countdown-label">Kết thúc trong</span>
              <FlashSaleTimer endTime={endTimeRef.current} />
            </div>
            <div className="flash-sale-body">
              <span className="price-new">{formatPrice(product?.price)}</span>
              <span className="price-old">19.490.000₫</span>
              <span className="discount-box">-1%</span>
            </div>
          </div>
          <button className="productdetail__buy-button"  onClick={() => handleAddToCart(product)}>
                  MUA NGAY 
                  <br></br>
          Giao tận nơi hoặc nhận tại cửa hàng
          </button>

          <div className="space-y-2 mt-4">
            <p className="productdetail__gift-title">Quà tặng:</p>
            <ul className="productdetail__gift-list">
              <li>🎁 Balo MSI Essential Backpack (Kèm máy)</li>
              <li>✔️ Bảo hành chính hãng 24 tháng</li>
              <li>✔️ Hỗ trợ đổi mới trong 7 ngày</li>
              <li>✔️ Miễn phí giao hàng toàn quốc</li>
            </ul>
          </div>

          <div className="productdetail__installment-info">
            Hỗ trợ trả tiền MPOS (Thẻ tín dụng), HDSAISON <span>Xem chi tiết</span>.
          </div>

          <div className="productdetail__extra-deals">
            <h6>Khuyến mãi</h6>
            <p><FaCheckCircle style={{color: '#1D9811' }}/> Giảm ngay 100.000đ khi mua Microsoft Office kèm Laptop. <span>Xem thêm</span></p>
            <p><FaCheckCircle style={{color: '#1D9811' }}/> Ưu đãi 500.000đ khi nâng cấp RAM với Laptop Gaming. <span>Xem thêm</span></p>
          </div>
        </div>
      </div>



      {/* // product recooomnet  */}

      <div className="productdetail__information">
          <div style={styles.container}>
            <h2 style={styles.title}>Gợi ý mua kèm</h2>
            <div style={styles.productList}>
              {/*  kiểm tra               {product.category.id} = 1 sẽ load sanb3 phẩm có product.rearCamera là "Laptop kèm theo"       ngược lại bằng 2 sẽ load "Điện thoại kèm theo" </h1> */}
              {accessoryProducts
                .filter((p) => {
                  if (product?.category?.id === 1) {
                    return p.rearCamera === "Laptop kèm theo";
                  } else if (product?.category?.id === 2) {
                    return p.rearCamera === "Điện thoại kèm theo";
                  }
                  return false;
                })
                .map((product) => (
                  console.log("product da loc KEM THEO ----------------", product),

                <div key={product.id} style={styles.productCard}>
                  <input
                    type="checkbox"
                    style={{
                      ...styles.checkbox,
                      ...(selectedItems.includes(product.id)
                        ? styles["checkbox:checked"]
                        : styles["checkbox:unchecked"]),
                    }}
                    checked={selectedItems.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                  />
                  <img
                    src={product.thumbnail}
                    alt={product.productName}
                    style={styles.productImage}
                  />
                  <h3 style={styles.productName}>{product.productName}</h3>
                  <p style={styles.originalPrice}>
                    {formatPrice(Number(product.price) +2000 )} 
                  </p>
                  <p style={styles.salePrice}>
                    {formatPrice(Number(product.price)) } 
                  </p>
                  <button
                    onClick={() => toggleSelect(product.id)}
                    style={{
                      ...styles.selectButton,
                      ...(selectedItems.includes(product.id)
                        ? styles.selectButtonSelected
                        : {}),
                    }}
                  >
                    {selectedItems.includes(product.id)
                      ? "Bỏ chọn"
                      : "Chọn sản phẩm"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>

  );
};


const styles = {
  container: {
    padding: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  productList: {
    display: "flex",
    overflowX: "auto",
    gap: "16px",
    paddingBottom: "16px",
  },
  productCard: {
    position: "relative", // để chứa checkbox
    minWidth: "200px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #e5e7eb",
  },
  productImage: {
    width: "96px",
    height: "96px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  productName: {
    fontSize: "0.875rem",
    fontWeight: "500",
    textAlign: "center",
    marginTop: "8px",
  },
  originalPrice: {
    color: "#6b7280",
    fontSize: "0.75rem",
    textDecoration: "line-through",
  },
  salePrice: {
    color: "#dc2626",
    fontWeight: "bold",
  },
  selectButton: {
    marginTop: "8px",
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontWeight: "500",
    backgroundColor: "#e5e7eb",
    color: "#1f2937",
    border: "none",
    cursor: "pointer",
  },
  selectButtonSelected: {
    backgroundColor: "#dc2626",
    color: "#fff",
  },
  summary: {
    marginTop: "16px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "16px",
  },
  totalPrice: {
    fontSize: "1rem",
    fontWeight: "600",
  },
  totalPriceAmount: {
    color: "#dc2626",
  },
  buyButton: {
    marginTop: "8px",
    width: "100%",
    padding: "8px",
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
  },
checkbox: {
  position: "absolute",
  top: "8px",
  right: "8px",
  transform: "scale(1.2)",
  cursor: "pointer",
  borderRadius: "50%",
  backgroundColor: "#fff",
  border: "1px solid rgb(56, 232, 255)",
  width: "24px",
  height: "24px",
  appearance: "none",
  
},
"checkbox:checked": {
  backgroundColor: "#22c55e", 
  border: "1px solid #22c55e", 
  backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"white\"><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/></svg>')", 
  backgroundSize: "cover",
  color: "#fff" 
},
"checkbox:unchecked": {
  backgroundColor: "#fff",
  border: "1px solid #e5e7eb" 
}
};

export default ProductDetail;

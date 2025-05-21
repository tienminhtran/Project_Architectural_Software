import React, { useState } from "react";
// import "./ProductRecommendation.css"; // Minimal CSS for hover effects

const sampleProducts = [
  {
    id: 1,
    name: "Ốp lưng Xiaomi 14T Pro",
    price: 350000,
    salePrice: 283000,
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png",
  },
  {
    id: 2,
    name: "Tai nghe Bluetooth",
    price: 490000,
    salePrice: 415000,
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_1_-_2024-11-02t162005.850.png",
  },
  {
    id: 3,
    name: "Office 365 Bản quyền",
    price: 1200000,
    salePrice: 999000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/k/i/kinh-cuong-luc-xiaomi-redmi-note-14.png',
  },
  {
    id: 4,
    name: "Chuột không dây Logitech",
    price: 300000,
    salePrice: 249000,
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/h/thi_t_k_ch_a_c_t_n_27_.png",
  },
  {
    id: 5,
    name: "Bàn phím cơ Keychron",
    price: 950000,
    salePrice: 850000,
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/k/i/kinh-cuong-luc-xiaomi-redmi-note-14.png",
  },
];

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
};

export default function ProductRecommendation() {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalPrice = selectedItems.reduce((sum, id) => {
    const product = sampleProducts.find((p) => p.id === id);
    return sum + (product?.salePrice || 0);
  }, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gợi ý mua kèm</h2>
      <div style={styles.productList}>
        {sampleProducts.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.productImage}
            />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.originalPrice}>{product.price.toLocaleString()} đ</p>
            <p style={styles.salePrice}>{product.salePrice.toLocaleString()} đ</p>
            <button
              onClick={() => toggleSelect(product.id)}
              style={{
                ...styles.selectButton,
                ...(selectedItems.includes(product.id)
                  ? styles.selectButtonSelected
                  : {}),
              }}
              className="select-button" // For hover effects
            >
              {selectedItems.includes(product.id) ? "Bỏ chọn" : "Chọn sản phẩm"}
            </button>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <p style={styles.totalPrice}>
          Tạm tính: <span style={styles.totalPriceAmount}>{totalPrice.toLocaleString()} đ</span>
        </p>
        <button style={styles.buyButton} className="buy-button">
          MUA NGAY
        </button>
      </div>
    </div>
  );
}
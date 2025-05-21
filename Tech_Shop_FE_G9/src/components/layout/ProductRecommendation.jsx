import React, { useState } from "react";
import useProductRecommendations from "../../hooks/useProductRecomment";
import { useQuery } from "@tanstack/react-query";

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
  const { productsRcm, isLoading, isError } = useProductRecommendations();

  const products = React.useMemo(() => {
    if (!Array.isArray(productsRcm)) return [];
    return productsRcm;
  }, [productsRcm]);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalPrice = selectedItems.reduce((sum, id) => {
    const product = products?.find((p) => p.id === id);
    const price = parseInt(product?.price) || 0;
    return sum + price;
  }, 0);

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (isError) return <div>Không thể tải dữ liệu. Vui lòng thử lại.</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gợi ý mua kèm</h2>
      <div style={styles.productList}>
        {Array.isArray(products) ? products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.productImage}
            />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.salePrice}>{parseInt(product.price).toLocaleString()} đ</p>
            <button
              onClick={() => toggleSelect(product.id)}
              style={{
                ...styles.selectButton,
                ...(selectedItems.includes(product.id)
                  ? styles.selectButtonSelected
                  : {}),
              }}
            >
              {selectedItems.includes(product.id) ? "Bỏ chọn" : "Chọn sản phẩm"}
            </button>
          </div>
        )):null}
      </div>
      <div style={styles.summary}>
        <p style={styles.totalPrice}>
          Tạm tính: <span style={styles.totalPriceAmount}>{totalPrice.toLocaleString()} đ</span>
        </p>
        <button style={styles.buyButton}>MUA NGAY</button>
      </div>
    </div>
  );
}

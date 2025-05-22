import React, { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const ProductInquiry = ({ addMessage }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  const fetchAllProducts = async (categoryId = null) => {
    const url = categoryId
      ? `https://api.tranminhtien.io.vn/api/v1/products?categoryId=${categoryId}`
      : `https://api.tranminhtien.io.vn/api/v1/products`;
    const res = await axios.get(url);
    return res.data?.response?.values || [];
  };

  const searchProductsByQuery = async (q, categoryId = null) => {
    const url = categoryId
      ? `https://api.tranminhtien.io.vn/api/v1/products/search/${encodeURIComponent(q)}?categoryId=${categoryId}`
      : `https://api.tranminhtien.io.vn/api/v1/products/search/${encodeURIComponent(q)}`;
    const res = await axios.get(url);
    return res.data?.response?.values || [];
  };

  const getGeminiResponse = async (question) => {
    const res = await model.generateContent(question);
    return res.response.text();
  };

  const parsePriceRange = (msg) => {
    const cleaned = msg.toLowerCase().replace(/[^0-9\s]/g, "");
    const digits = cleaned.match(/\d+/g)?.map(Number) || [];

    if (msg.includes("trên") || msg.includes("hơn"))
      return { min: digits[0] * 1_000_000, max: null };
    if (msg.includes("dưới") || msg.includes("ít hơn"))
      return { min: 0, max: digits[0] * 1_000_000 };
    if (msg.includes("tầm") || msg.includes("khoảng") || msg.includes("giữa")) {
      if (digits.length >= 2)
        return { min: digits[0] * 1_000_000, max: digits[1] * 1_000_000 };
    }
    return null;
  };

  const getIntent = (msg) => {
    const lower = msg.toLowerCase();
    let categoryId = null;

    if (lower.includes("laptop")) {
      categoryId = 1; // Laptops
    } else if (lower.includes("điện thoại") || lower.includes("phone")) {
      categoryId = 2; // Phones
    }

    if (parsePriceRange(msg)) return { intent: "search_by_price", categoryId };
    if (lower.includes("thông số") || lower.includes("cấu hình"))
      return { intent: "product_specs", categoryId };
    if (lower.includes("đánh giá") || lower.includes("rating"))
      return { intent: "top_rated", categoryId };
    if (lower.includes("bán chạy") || lower.includes("mua nhiều"))
      return { intent: "best_seller", categoryId };
    return { intent: "search_general", categoryId };
  };

  const sendQuery = async () => {
    if (!query.trim()) return;
    addMessage({ sender: "user", text: query });
    setLoading(true);

    try {
      const { intent, categoryId } = getIntent(query);
      let values = [];

      if (intent === "search_by_price") {
        const priceRange = parsePriceRange(query);
        values = await fetchAllProducts(categoryId);
        values = values.filter(
          (p) =>
            (!priceRange.min || p.price >= priceRange.min) &&
            (!priceRange.max || p.price <= priceRange.max) &&
            (!categoryId || p.category.id === categoryId)
        );

        if (values.length > 0) {
          const categoryText = categoryId === 1 ? "laptop" : categoryId === 2 ? "điện thoại" : "sản phẩm";
          addMessage({ sender: "bot", text: `📦 Các ${categoryText} phù hợp với mức giá:` });
        } else {
          addMessage({ sender: "bot", text: `❌ Không tìm thấy ${categoryId === 1 ? "laptop" : categoryId === 2 ? "điện thoại" : "sản phẩm"} nào.` });
        }
      } else if (intent === "search_general") {
        values = await searchProductsByQuery(query, categoryId);
        if (values.length > 0) {
          const categoryText = categoryId === 1 ? "laptop" : categoryId === 2 ? "điện thoại" : "sản phẩm";
          addMessage({ sender: "bot", text: `🔍 Đây là kết quả tìm kiếm ${categoryText}:` });
        } else {
          const geminiText = await getGeminiResponse(query);
          addMessage({ sender: "bot", text: `Admin trả lời: ${geminiText}` });
        }
      } else if (intent === "product_specs") {
        values = await searchProductsByQuery(query, categoryId);
        if (values.length > 0) {
          addMessage({
            sender: "bot",
            text: `📋 Thông số sản phẩm "${values[0].productName}": ${
              values[0].description || "Chưa có thông tin chi tiết."
            }`,
          });
        } else {
          const geminiText = await getGeminiResponse(query);
          addMessage({ sender: "bot", text: `Admin: ${geminiText}` });
        }
      } else if (intent === "top_rated") {
        values = await fetchAllProducts(categoryId);
        values = values
          .filter((p) => !categoryId || p.category.id === categoryId)
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 5);
        const categoryText = categoryId === 1 ? "laptop" : categoryId === 2 ? "điện thoại" : "sản phẩm";
        addMessage({ sender: "bot", text: `🌟 Các ${categoryText} được đánh giá cao:` });
      } else if (intent === "best_seller") {
        values = await fetchAllProducts(categoryId);
        values = values
          .filter((p) => !categoryId || p.category.id === categoryId)
          .sort((a, b) => (b.sold || 0) - (a.sold || 0))
          .slice(0, 5);
        const categoryText = categoryId === 1 ? "laptop" : categoryId === 2 ? "điện thoại" : "sản phẩm";
        addMessage({ sender: "bot", text: `🔥 Các ${categoryText} bán chạy:` });
      }

      setProducts(values);
    } catch (error) {
      addMessage({
        sender: "bot",
        text: "❗ Lỗi khi tìm kiếm sản phẩm, vui lòng thử lại.",
      });
    }

    setLoading(false);
    setQuery("");
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Hỏi về sản phẩm (laptop hoặc điện thoại)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendQuery()}
        disabled={loading}
        style={styles.input}
      />
      <button
        onClick={sendQuery}
        disabled={loading}
        style={{
          ...styles.button,
          ...(loading ? styles.buttonDisabled : {}),
        }}
      >
        Tìm kiếm
      </button>

      {products.length > 0 && (
        <ul style={styles.productList} >
          {products.map((prod) => (
            <li
              key={prod.id}
              style={{
                ...styles.productItem,
                ...(hoveredId === prod.id ? styles.productItemHover : {}),
              }}
              onMouseEnter={() => setHoveredId(prod.id)}
              onMouseLeave={() => setHoveredId(null)}
                          onClick={() =>
              navigate(`/product/${btoa(prod.id)}`, { state: { product: prod } })
            }
            >
              <img
                src={prod.thumbnail}
                alt={prod.productName}
                width={60}
                style={styles.productImg}
              />
              <div>
                <b style={styles.productName}>{prod.productName}</b>
                <p style={styles.productPrice}>
                  {prod.price.toLocaleString()} VND
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

  const styles = {
    container: {
      maxWidth: 600,
      margin: "20px auto",
      padding: "12px 16px",
      border: "1px solid #ddd",
      borderRadius: 8,
      backgroundColor: "#fafafa",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    input: {
      width: "calc(100% - 100px)",
      padding: "10px 14px",
      fontSize: 16,
      border: "1px solid #ccc",
      borderRadius: 6,
      outlineOffset: 2,
      transition: "border-color 0.3s",
    },
    button: {
      width: 80,
      marginLeft: 12,
      padding: "10px 0",
      fontWeight: 600,
      fontSize: 16,
      color: "white",
      backgroundColor: "#4a90e2",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonDisabled: {
      backgroundColor: "#a0b9dd",
      cursor: "not-allowed",
    },
    productList: {
      listStyle: "none",
      marginTop: 20,
      padding: 0,
      maxHeight: 300,
      overflowY: "auto",
      borderTop: "1px solid #ddd",
    },
    productItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 8px",
      borderBottom: "1px solid #eee",
      transition: "background-color 0.2s",
      cursor: "pointer",
    },
    productItemHover: {
      backgroundColor: "#f0f8ff",
    },
    productImg: {
      borderRadius: 6,
      marginRight: 14,
      objectFit: "cover",
      flexShrink: 0,
    },
    productName: {
      fontSize: 16,
      color: "#333",
    },
    productPrice: {
      marginTop: 4,
      fontSize: 14,
      color: "#666",
    },
  };

export default ProductInquiry;

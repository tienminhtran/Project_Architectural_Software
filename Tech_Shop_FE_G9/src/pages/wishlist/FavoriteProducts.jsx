import React, { useState } from "react";
import "../../assets/css/FavoriteProducts.css";
import { FaCartPlus, FaRegTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterUser from "../../components/layout/Footer";
import useWishlist from "../../hooks/useWishlist";
import HeaderUser from "../../components/layout/HeaderUser";

// const wishlistItems = [
//   {
//     id: 1,
//     name: "Tấm lót chuột Steelseries Qck Mini Mousepad",
//     image: "/images/product/mouse3.jpg",
//     price: 219000,
//     originalPrice: 250000,
//   },
//   {
//     id: 2,
//     name: "Chuột gaming Logitech G102",
//     image: "/images/product/mouse1.jpg",
//     price: 299000,
//     originalPrice: 390000,
//   },
//   {
//     id: 3,
//     name: "Bàn phím cơ DareU EK87",
//     image: "/images/product/mouse1.jpg",
//     price: 590000,
//     originalPrice: 690000,
//   },
//   {
//     id: 4,
//     name: "Tấm lót chuột Steelseries Qck Mini Mousepad",
//     image: "/images/product/mouse3.jpg",
//     price: 219000,
//     originalPrice: 250000,
//   },
//   {
//     id: 5,
//     name: "Chuột gaming Logitech G102",
//     image: "/images/product/mouse1.jpg",
//     price: 299000,
//     originalPrice: 390000,
//   },
//   {
//     id: 6,
//     name: "Bàn phím cơ DareU EK87",
//     image: "/images/product/mouse1.jpg",
//     price: 590000,
//     originalPrice: 690000,
//   },
//   {
//     id: 7,
//     name: "Tấm lót chuột Steelseries Qck Mini Mousepad",
//     image: "/images/product/mouse1.jpg",
//     price: 219000,
//     originalPrice: 250000,
//   },
//   {
//     id: 8,
//     name: "Chuột gaming Logitech G102",
//     image: "/images/product/mouse1.jpg",
//     price: 299000,
//     originalPrice: 390000,
//   },
//   {
//     id: 9,
//     name: "Bàn phím cơ DareU EK87",
//     image: "/images/product/mouse1.jpg",
//     price: 590000,
//     originalPrice: 690000,
//   },
// ];

export default function FavoriteProducts() {
  const { wishlists, isLoading, isError } = useWishlist();
  const wishlistItems = (wishlists?.response || []).map((item) => ({
    id: item.productId,
    name: item.title || "Không có tên",
    price: item.unitPrice || 0,
    originalPrice: item.unitPrice || 0,
    image: item.thumbnail || "/images/product/default.jpg",
  }));
  // console.log("Wishlist Items:", wishlistItems);

  const [selectedItems, setSelectedItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map((product) => product.id));
    }
    setIsAllSelected(!isAllSelected);
  };
  // xử lý thông báo
  const handleAddToCart = () => {
    toast.success("Đã thêm vào giỏ hàng thành công!", { autoClose: 2000 });
  };

  const handleRemoveFavorite = (id) => {
    const product = wishlistItems.find((p) => p.id === id);
    confirmAlert({
      title: "Xác nhận",
      message: `Bạn có chắc muốn xóa "${product.name}" khỏi danh sách yêu thích?`,
      buttons: [
        {
          label: "Có",
          onClick: () => {
            setSelectedItems((prev) => prev.filter((item) => item !== id));
            toast.success("Đã xóa khỏi yêu thích!", { autoClose: 2000 });
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };
  // xóa tất cả sản phẩm

  const productsToShow = showAll ? wishlistItems : wishlistItems.slice(0, 5);
  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Lỗi khi tải danh sách sản phẩm yêu thích.</div>;

  return (
    <div>
      <HeaderUser />

      <div style={{ display: "flex" }}>
        <div>
          <img
            src="../../../public/images/bg/thu-cu-doi-moi.png"
            alt="Logo"
            className="CartBuy-OrderBox__logo"
            style={{ width: "160px" }}
          />
        </div>

        <div className="favorite-products">
          <h2 className="favorite-product__title">Sản phẩm yêu thích</h2>

          {selectedItems.length > 0 && (
            <div className="favorite-product__top-actions">
              <button
                className="favorite-product__btn favorite-product__btn--add"
                onClick={handleAddToCart}
              >
                <FaCartPlus /> Thêm vào giỏ hàng
              </button>
            </div>
          )}

          <table className="favorite-product__table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={isAllSelected}
                  />
                </th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Giá gốc</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      color: "#888",
                      padding: "24px",
                    }}
                  >
                    Chưa có sản phẩm yêu thích
                  </td>
                </tr>
              ) : (
                productsToShow.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(product.id)}
                        onChange={() => toggleCheckbox(product.id)}
                      />
                    </td>
                    <td>
                      <img
                        className="favorite-product__image"
                        src={product.image}
                        alt={product.name}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td className="favorite-product__price">
                      {product.price.toLocaleString()}₫
                    </td>
                    <td className="favorite-product__original-price">
                      {product.originalPrice.toLocaleString()}₫
                    </td>
                    <td
                      style={{
                        display: "",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        className="favorite-product__btn favorite-product__btn--add"
                        onClick={handleAddToCart}
                      >
                        <FaCartPlus />{" "}
                      </button>
                      <button
                        className="favorite-product__btn favorite-product__btn--remove"
                        onClick={() => handleRemoveFavorite(product.id)}
                      >
                        <FaRegTrashAlt />{" "}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="favorite-product__see-more">
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "Thu gọn" : "Xem thêm"}
            </button>
          </div>

          {selectedItems.length > 0 && (
            <div className="favorite-product__mini-cart">
              <h3>Giỏ hàng nhanh</h3>
              <ul>
                {selectedItems.map((id) => {
                  const product = wishlistItems.find((p) => p.id === id);
                  return (
                    <li key={id}>
                      {product.name} – {product.price.toLocaleString()}₫
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div>
          <img
            src="../../../public/images/bg/mua-he-ruc-ro.png"
            alt="Logo"
            className="CartBuy-OrderBox__logo"
            style={{ width: "160px" }}
          />
        </div>
      </div>

      <FooterUser />
    </div>
  );
}

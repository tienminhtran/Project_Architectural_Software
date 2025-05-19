import React, { useState } from "react";
import "../../assets/css/FavoriteProducts.css";
import { FaCartPlus, FaRegTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterUser from "../../components/layout/Footer";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import HeaderUser from "../../components/layout/HeaderUser";

export default function FavoriteProducts() {
  const { addItem } = useCart();
  const { wishlists, isLoading, isError, deleteItem } = useWishlist();
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

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddtoCart = (product) => {
    try {
      const request = {
        id_product: product?.id,
        quantity: 1,
      };
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

  // Hàm xử lý xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveFavorite = (id) => {
    confirmAlert({
      title: "Xác nhận xóa",
      message:
        "Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            deleteItem(id, {
              onSuccess: () => {
                toast.success("Đã xóa sản phẩm khỏi danh sách yêu thích", {
                  position: "top-right",
                  autoClose: 2000,
                });
              },
              onError: () => {
                toast.error("Lỗi khi xóa sản phẩm khỏi danh sách yêu thích", {
                  position: "top-right",
                  autoClose: 2000,
                });
              },
            });
          },
        },
        {
          label: "Không",
        },
      ],
    });
  };

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

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {selectedItems.length > 0 && (
              <div className="favorite-product__top-actions">
                <button
                  className="favorite-product__btn favorite-product__btn--remove"
                  onClick={() => {
                    confirmAlert({
                      title: "Xác nhận xóa",
                      message:
                        "Bạn có chắc chắn muốn xóa các sản phẩm đã chọn khỏi danh sách yêu thích?",
                      buttons: [
                        {
                          label: "Có",
                          onClick: () => {
                            selectedItems.forEach((id) => {
                              const product = wishlistItems.find(
                                (p) => p.id === id
                              );
                              if (product) {
                                deleteItem(product.id, {
                                  onSuccess: () => {
                                    toast.success(
                                      "Đã xóa sản phẩm khỏi danh sách yêu thích",
                                      {
                                        position: "top-right",
                                        autoClose: 2000,
                                      }
                                    );
                                  },
                                  onError: () => {
                                    toast.error(
                                      "Lỗi khi xóa sản phẩm khỏi danh sách yêu thích",
                                      {
                                        position: "top-right",
                                        autoClose: 2000,
                                      }
                                    );
                                  },
                                });
                              }
                            });
                            setSelectedItems([]);
                          },
                        },
                        {
                          label: "Không",
                        },
                      ],
                    });
                  }}
                >
                  <FaRegTrashAlt /> Xóa tất cả sản phẩm
                </button>
              </div>
            )}
            {selectedItems.length > 0 && (
              <div className="favorite-product__top-actions">
                <button
                  className="favorite-product__btn favorite-product__btn--add"
                  onClick={() => {
                    selectedItems.forEach((id) => {
                      const product = wishlistItems.find((p) => p.id === id);
                      if (product) {
                        handleAddtoCart(product);
                      }
                    });
                    setSelectedItems([]);
                  }}
                >
                  <FaCartPlus /> Thêm vào giỏ hàng
                </button>
              </div>
            )}
          </div>

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
                        onClick={() => {
                          handleAddtoCart(product);
                        }}
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

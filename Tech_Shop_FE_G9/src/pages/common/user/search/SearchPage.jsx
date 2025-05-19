import React, { useState, useEffect, useMemo } from "react";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import useCart from "../../../../hooks/useCart";
import useWishlist from "../../../../hooks/useWishlist";
import useProduct from "../../../../hooks/useProduct";
import Loading from "../../../../components/common/Loading";


const SearchPage = ({ query }) => {
    const navigate = useNavigate();
    const { addItem } = useCart();
    const { addItem: addWishlistItem } = useWishlist();
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại (0-indexed)
    const [pageSize] = useState(8); // Số sản phẩm mỗi trang

    // Product search
    const { search_paging } = useProduct(currentPage, pageSize, query);
    const { data, isLoading, isError, error } = search_paging;

    const products = useMemo(() => {
        if (data?.values) {
            return data.values;
        }
        return [];
    }, [data]);

    // Tổng số trang và tổng số sản phẩm từ API
    const totalPages = data?.totalPages || 0;
    const totalItems = data?.total || 0;

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

    // Hàm xử lý thêm sản phẩm vào danh sách yêu thích
    const handleAddToWishlist = (e, product) => {
        e.stopPropagation();
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
                    toast.error("Sản phẩm đã có trong danh sách yêu thích!", {
                        position: "top-right",
                        autoClose: 1500,
                    });
                },
            }
        );
    };

    return (
        <>
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <div className="product-user-phone__product-container">
                    <div>
                        <h2 className="text-center">Tìm kiếm</h2>
                        <h6 className="text-center">Kết quả tìm kiếm cho "{query}"</h6>
                    </div>
                    {isError ? (
                        <div className="text-center text-danger">
                            Lỗi khi tải sản phẩm: {error?.message || "Không xác định"}
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            <div className="product-user-phone__product-grid">
                                {products.map((product, index) => (
                                    <button
                                        className="product-user-phone__product-card"
                                        key={index}
                                        onClick={() =>
                                            navigate(`/product/${btoa(product.id)}`, {
                                                state: { product },
                                            })
                                        }
                                    >
                                        <div className="product-user-phone__product-img-wrapper">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.productName}
                                                className="product-user-phone__product-img"
                                            />
                                            <span className="product-user-phone__product-discount">
                                                {product.discount || "0"}% OFF
                                            </span>
                                            <div className="product-user-phone__product-actions">
                                                <button
                                                    className="product-user-phone__icon-btn-love"
                                                    onClick={(e) => handleAddToWishlist(e, product)}
                                                >
                                                    <FaHeart />
                                                </button>
                                                <button
                                                    className="product-user-phone__icon-btn-eye"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log("Clicked eye icon");
                                                    }}
                                                >
                                                    <FaEye />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="product-user-phone__product-info">
                                            <h5>{product.productName}</h5>
                                            <p>
                                                <span className="product-user-phone__price-new">
                                                    {product.price.toLocaleString()} ₫
                                                </span>{" "}
                                                {product.oldPrice && (
                                                    <del className="product-user-phone__price-old">
                                                        {product.oldPrice.toLocaleString()} ₫
                                                    </del>
                                                )}
                                            </p>
                                            <ul className="product-user-phone__product-specs">
                                                <li>RAM: {product.ram}</li>
                                                <li>Màn hình: {product.monitor}</li>
                                                <li>Pin: {product.battery}</li>
                                                <li>Hệ điều hành: {product.os}</li>
                                            </ul>
                                            <button
                                                className="product-user-phone__add-to-cart"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddtoCart(product);
                                                }}
                                            >
                                                <FaShoppingCart /> Thêm giỏ hàng
                                            </button>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="product-user-phone__pagination">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                                        disabled={currentPage === 0}
                                    >
                                        Prev
                                    </button>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index)}
                                            className={currentPage === index ? "active" : ""}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                                        }
                                        disabled={currentPage >= totalPages - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <h2 className="text-center">Không có sản phẩm nào</h2>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchPage;

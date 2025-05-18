import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getItemWishlistUser,
  addItemToWishlist,
  deleteItemWishlist,
} from "../services/wishlistService";
import React from "react";

const useWishlist = () => {
  const queryClient = useQueryClient();
  const [error, setError] = React.useState({});

  // Lấy danh sách sản phẩm trong wishlist của người dùng
  const {
    data: wishlists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlistItems"],
    queryFn: getItemWishlistUser,
    refetchOnWindowFocus: false, // Không tự động refetch khi chuyển tab
  });

  // Thêm sản phẩm vào wishlist
  const addItem = useMutation({
    mutationFn: (request) => addItemToWishlist(request),
    onSuccess: (data) => {
      console.log("Item added to wishlist:", data);
      queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
    },
    onError: (error) => {
      console.log("Error adding item to wishlist:", error);
    },
  });

  // Xóa sản phẩm khỏi wishlist
  const deleteItem = useMutation({
    mutationFn: (id) => deleteItemWishlist(id),
    onSuccess: (data) => {
      console.log("Item deleted from wishlist:", data);
      queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
    },
    onError: (error) => {
      console.log("Error deleting item from wishlist:", error);
    },
  });

  return {
    wishlists,
    isLoading,
    isError,
    addItem,
    deleteItem,
    error, // Trả về lỗi nếu có
  };
};

export default useWishlist;

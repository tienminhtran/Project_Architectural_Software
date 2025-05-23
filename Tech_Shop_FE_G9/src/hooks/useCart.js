import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItemCartUser, addItemToCart, deleteItemToCart, updateQuatityItemCart } from "../services/cartService";
import React from "react";

const useCart = () => {
  const queryClient = useQueryClient();
  const [error, setError] = React.useState({}); // State to store error message

  // Lấy danh sách sản phẩm trong giỏ hàng của người dùng
  const {
    data: carts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getItemCartUser,
    refetchOnWindowFocus: false, // Không tự động refetch khi chuyển tab
  });

  const addItem = useMutation({
    mutationFn: (request) => addItemToCart(request),
    onSuccess: (data) => {
      console.log("Item added to cart successfully:", data);
      queryClient.invalidateQueries(["cartItems"]); // Invalidate the cart items query to refetch the updated data
    },
    onError: (error) => {
      console.error("Error adding item to cart:", error);
    },
  });

  const deleteItem = useMutation({
    mutationFn: (id) => deleteItemToCart(id),
    onSuccess: (data) => {
      console.log("Item deleted from cart successfully:", data);
      queryClient.invalidateQueries(["cartItems"]); // Invalidate the cart items query to refetch the updated data
    },
    onError: (error) => {
      console.error("Error deleting item from cart:", error);
    },
  });

  const updateQuantity = useMutation({
    mutationFn: ({id, quantity}) => updateQuatityItemCart(id, quantity),
    onSuccess: (data) => {
      console.log("Item quantity updated successfully:", data);
      queryClient.invalidateQueries(["cartItems"]); // Invalidate the cart items query to refetch the updated data
      setError((prevErrors) => ({ ...prevErrors, [data.response.id_product]: null }));
    },
    onError: (error, { id }) => {
      console.error("Error updating item quantity:", error);
      const errorMessage = error.response?.data?.message || "Failed to update quantity";
      setError((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    },
  });

  return { 
    carts, isLoading, isError,
    addItem: addItem.mutate,
    deleteItem: deleteItem.mutate,
    updateQuantity: updateQuantity.mutate,
    errorUpdate: updateQuantity.error,
    error, // Trả về state error để sử dụng trong component
  };
};

export default useCart;

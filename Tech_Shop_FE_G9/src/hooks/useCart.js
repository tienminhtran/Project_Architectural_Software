import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItemCartUser, addItemToCart, deleteItemToCart, updateQuatityItemCart } from "../services/cartService";

const useCart = () => {
  const queryClient = useQueryClient();

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
    },
    onError: (error) => {
      console.error("Error updating item quantity:", error);
    },
  })

  return { 
    carts, isLoading, isError,
    addItem: addItem.mutate,
    deleteItem: deleteItem.mutate,
    updateQuantity: updateQuantity.mutate,
  };
};

export default useCart;

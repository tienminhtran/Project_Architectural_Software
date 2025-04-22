import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItemCartUser } from "../services/cartService";

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
    onSuccess: (data) => {
      console.log("Cart items fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching cart items:", error);
    },
  });

  return { carts, isLoading, isError };
};

export default useCart;

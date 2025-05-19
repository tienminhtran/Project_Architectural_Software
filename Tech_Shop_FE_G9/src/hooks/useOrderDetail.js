import { useQuery } from "@tanstack/react-query";
import { getOrderDetailByOrderId as fetchOrderDetailByOrderId } from "../services/orderDetailService";

const useOrderDetail = (orderId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: () => fetchOrderDetailByOrderId(orderId),
    enabled: !!orderId,
  });

  // Return an object with named properties similar to useOrder pattern
  return {
    getOrderDetailByOrderId: data,
    isLoading,
    isError,
  };
};

export default useOrderDetail;

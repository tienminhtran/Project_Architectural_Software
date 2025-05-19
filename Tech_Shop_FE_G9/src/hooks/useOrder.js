import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import usePaginationQuery from "./usePaginationQuery";

import {
  deleteOrder as deleteOrderService,
  getAllOrder_Paging,
  filterOrderAll,
  getDailyOrders,
  getDailyCategory,
  createOrder as createOrderService,
  fetchOrderByPhoneNumber,
} from "../services/orderService";

const useOrder = (
  pageNo,
  pageSize,
  status = "",
  payment = "",
  firstname = "",
  phoneNumber = ""
) => {
  const queryClient = useQueryClient();

  // Xóa đơn hàng
  const deleteOrder = useMutation({
    mutationFn: (id) => deleteOrderService(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllOrder_Paging"]);
      alert("Delete order successfully!");
    },
    onError: (error) => {
      console.error("Delete order failed:", error);
      alert("Delete order failed. Please try again!");
    },
  });

  // Đơn hàng theo ngày
  const dailyOrders = useQuery({
    queryKey: ["dailyOrders"],
    queryFn: getDailyOrders,
  });

  // Danh mục đơn hàng theo ngày
  const dailyCategory = useQuery({
    queryKey: ["dailyCategory"],
    queryFn: getDailyCategory,
  });

  // Thêm mutation tạo đơn hàng
  const createOrder = useMutation({
    mutationFn: (orderData) => createOrderService(orderData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getAllOrder_Paging"]);
      return data;
    },
    onError: (error) => {
      console.error("Create order failed:", error);
      throw error; // Ném lỗi để component xử lý
    },
  });

  // lấy thông tin đơn hàng theo số điện thoại
  const getOrderByPhoneQuery = useQuery({
    queryKey: ["getOrderByPhoneNumber", phoneNumber],
    queryFn: () => fetchOrderByPhoneNumber(phoneNumber),
    enabled: !!phoneNumber,
  });

  return {
    orders_paging: usePaginationQuery(
      "getAllOrder_Paging",
      getAllOrder_Paging,
      pageNo,
      pageSize
    ),

    filterOrderAllPaging: usePaginationQuery(
      "filterOrderAll",
      (page, size) =>
        filterOrderAll(page, size, firstname, phoneNumber, payment, status),
      pageNo,
      pageSize,
      `${firstname}-${phoneNumber}-${payment}-${status}`,
      true
    ),

    deleteOrder: deleteOrder.mutate,
    dailyOrders: dailyOrders.data?.response || 0,
    dailyCategory: dailyCategory.data?.response || 0,
    createOrder: createOrder.mutateAsync,
    // Trả về thông tin đơn hàng theo số điện thoại
    getOrderByPhoneNumber: getOrderByPhoneQuery.data || [],
  };
};

export default useOrder;

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import {
    deleteOrder as deleteOrderService,
    getAllOrder_Paging,
    searchOrder,
    getDailyCategory,
    getDailyOrders,
    filterOrderByStatus,
    filterOrderByPayment,
} from "../services/orderService";
import usePaginationQuery from "./usePaginationQuery";

const useOrder = (pageNo, pageSize, orderSearch, status = "", payment = "") => {
    // Lấy danh sách đơn hàng theo ngày
    const dailyOrders = useQuery({
        queryKey: ["dailyOrders"],
        queryFn: () => getDailyOrders(),
    });

    const dailyCategory = useQuery({
        queryKey: ["dailyCategory"],
        queryFn: () => getDailyCategory(),
    });

    const queryClient = useQueryClient();
    const deleteOrder = useMutation({
        mutationFn: (id) => deleteOrderService(id),
        onSuccess: () => {
            queryClient.invalidateQueries("getAllOrder_Paging");
            alert("Delete order successfully!!");
        },
        onError: (error) => {
            console.error("Delete order failed:", error);
            alert("Delete order fail. Please try again!");
        },
    });

    return {
        orders_paging: usePaginationQuery(
            "getAllOrder_Paging",
            getAllOrder_Paging,
            pageNo,
            pageSize
        ),
        search_paging: usePaginationQuery(
            "searchOrder",
            searchOrder,
            pageNo,
            pageSize,
            orderSearch,
            true
        ),
        filterOrderByStatus: usePaginationQuery(
            "filterOrderByStatus",
            (page, size) => filterOrderByStatus(page, size, status),
            pageNo,
            pageSize,
            status,
            true
        ),
        filterOrderByPayment: usePaginationQuery(
            "filterOrderByPayment",
            (page, size) => filterOrderByPayment(page, size, payment),
            pageNo,
            pageSize,
            payment,
            true
        ),
        deleteOrder: deleteOrder.mutate,
        dailyOrders: dailyOrders.data?.response || 0,
        dailyCategory: dailyCategory.data?.response || 0,
    };
};

export default useOrder;

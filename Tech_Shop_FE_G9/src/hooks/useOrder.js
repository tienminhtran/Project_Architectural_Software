import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import usePaginationQuery from "./usePaginationQuery";

import {
    deleteOrder as deleteOrderService,
    getAllOrder_Paging,
    filterOrderAll,
    getDailyOrders,
    getDailyCategory,
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
                filterOrderAll(
                    page,
                    size,
                    firstname,
                    phoneNumber,
                    payment,
                    status
                ),
            pageNo,
            pageSize,
            `${firstname}-${phoneNumber}-${payment}-${status}`,
            true
        ),

        deleteOrder: deleteOrder.mutate,
        dailyOrders: dailyOrders.data?.response || 0,
        dailyCategory: dailyCategory.data?.response || 0,
    };
};

export default useOrder;

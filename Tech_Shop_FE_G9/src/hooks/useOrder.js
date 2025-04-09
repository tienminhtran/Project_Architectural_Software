import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    // getDailyOrders,
    // getDailyCategory,
    getTotalOrderPending,
    getTotalProductSold,
    deleteOrder as deleteOrderService,
    getAllOrder_Paging,
} from "../services/orderService";
import usePaginationQuery from "./usePaginationQuery";
import { get } from "react-hook-form";

const useOrder = (pageNo, pageSize) => {
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
        getTotalOrderPending: usePaginationQuery(
            "getTotalOrderPending",
            getTotalOrderPending,
            pageNo,
            pageSize
        ),
        getTotalProductSold: usePaginationQuery(
            "getTotalProductSold",
            getTotalProductSold,
            pageNo,
            pageSize
        ),
        deleteOrder: deleteOrder.mutate,
    };
};

export default useOrder;

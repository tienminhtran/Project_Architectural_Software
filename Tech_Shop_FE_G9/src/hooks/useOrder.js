import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    deleteOrder as deleteOrderService,
    getAllOrder_Paging,
    searchOrder,
} from "../services/orderService";
import usePaginationQuery from "./usePaginationQuery";

const useOrder = (pageNo, pageSize, orderSearch) => {
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
        deleteOrder: deleteOrder.mutate,
    };
};

export default useOrder;

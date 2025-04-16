import { useQuery } from "@tanstack/react-query";
import { getOrderDetailById } from "../services/orderDetailService";

const useOrderDetail = (orderId) => {
    return useQuery({
        queryKey: ["orderDetail", orderId], // Key để quản lý cache
        queryFn: () => getOrderDetailById(orderId), // Hàm fetch dữ liệu
        enabled: !!orderId, // Chỉ fetch khi orderId có giá trị
    });
};

export default useOrderDetail;

import { useQuery } from "@tanstack/react-query";

import { getDailyOrders } from "../services/orderService";

const useOrder = () => {

    const dailyOrders = useQuery({
        queryKey: ["dailyOrders"],
        queryFn: getDailyOrders,
    });

    return {
        dailyOrders: dailyOrders.data?.response || 0,
    };

};

export default useOrder;
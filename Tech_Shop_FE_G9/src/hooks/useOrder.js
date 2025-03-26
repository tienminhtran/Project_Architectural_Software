import { useQuery } from "@tanstack/react-query";

import { getDailyOrders, getDailyCategory } from "../services/orderService";

const useOrder = () => {

    const dailyOrders = useQuery({
        queryKey: ["dailyOrders"],
        queryFn: getDailyOrders,
    });

    const dailyCategory = useQuery({
        queryKey: ["dailyCategory"],
        queryFn: getDailyCategory
    });



    return {
        dailyOrders: dailyOrders.data?.response || 0,
        dailyCategory: dailyCategory.data?.response || 0
    };

};

export default useOrder;
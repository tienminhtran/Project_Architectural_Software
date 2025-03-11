import { useQuery } from "@tanstack/react-query";
import { getRenevenue, getTotalProduct } from "../services/productService";
import { getTotalAvailVoucher } from "../services/voucherService";
import { getTotalProductSold } from "../services/orderService";

//useQuey (queryKey: [""], queryFn: () => Promise<any>)
const useDashboardData = () => {
  const revenue = useQuery({ queryKey: ["revenue"], queryFn: getRenevenue });
  const totalProducts = useQuery({
    queryKey: ["totalProducts"],
    queryFn: getTotalProduct,
  });
  const totalProductsSold = useQuery({
    queryKey: ["totalProductsSold"],
    queryFn: getTotalProductSold,
  });
  const totalAvailVoucher = useQuery({
    queryKey: ["totalAvailVoucher"],
    queryFn: getTotalAvailVoucher,
  });

  

  return {
    revenue: revenue.data?.response || 0,
    totalAvailVoucher: totalAvailVoucher.data?.response || 0,
    totalProductsSold: totalProductsSold.data?.response || 0,
    totalProducts: totalProducts.data?.response || 0,
  };
};

export default useDashboardData;

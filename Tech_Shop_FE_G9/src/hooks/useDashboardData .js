import { useQuery } from "@tanstack/react-query";
import { getRenevenue, getTotalProduct, getProductsBestSeller, getRecentlyProductAdd } from "../services/productService";
import { getTotalAvailVoucher } from "../services/voucherService";
import { getTotalProductSold } from "../services/orderService";
import { getLoyalCustomers } from "../services/userService"; 

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

  const getBestSeller = useQuery({
    queryKey: ["bestSeller"],
    queryFn: getProductsBestSeller,
  });

  const getRecentlyProduct = useQuery({
    queryKey: ["recentlyProduct"],
    queryFn: getRecentlyProductAdd,
    });

    const getLoyalCustomer = useQuery({
      queryKey: ["loyalCustomer"],
      queryFn: getLoyalCustomers,
    });

  return {
    revenue: revenue.data?.response || 0,
    totalAvailVoucher: totalAvailVoucher.data?.response || 0,
    totalProductsSold: totalProductsSold.data?.response || 0,
    totalProducts: totalProducts.data?.response || 0,
    bestSeller: getBestSeller.data?.response || [],
    recentlyProduct: getRecentlyProduct.data?.response || [],
    loyalCustomer: getLoyalCustomer.data?.response || [],
  };
};

export default useDashboardData;

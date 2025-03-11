import { useQuery } from "@tanstack/react-query";
import {
  getRenevenue,
  getTotalProduct,
  getProductsBestSeller,
  getRecentlyProductAdd,
} from "../services/productService";
import { getTotalAvailVoucher } from "../services/voucherService";
import {
  getTotalProductSold,
  getTotalOrder,
  getTotalOrderPending,
} from "../services/orderService";
import {
  getLoyalCustomers,
  countUserByRoleManager,
  countUserByRoleUser,
} from "../services/userService";

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

  const countByRoleUser = useQuery({
    queryKey: ["countUserByRoleUser"],
    queryFn: countUserByRoleUser,
  });

  const countByRoleManager = useQuery({
    queryKey: ["countUserByRoleManager"],
    queryFn: countUserByRoleManager,
  });

  const totalOrder = useQuery({
    queryKey: ["totalOrder"],
    queryFn: getTotalOrder,
  });

  const totalOrderPending = useQuery({
    queryKey: ["totalOrderPending"],
    queryFn: getTotalOrderPending,
  });

  return {
    revenue: revenue.data?.response || 0,
    totalAvailVoucher: totalAvailVoucher.data?.response || 0,
    totalProductsSold: totalProductsSold.data?.response || 0,
    totalProducts: totalProducts.data?.response || 0,
    bestSeller: getBestSeller.data?.response || [],
    recentlyProduct: getRecentlyProduct.data?.response || [],
    loyalCustomer: getLoyalCustomer.data?.response || [],
    countByRoleUser: countByRoleUser.data?.response || 0,
    countByRoleManager: countByRoleManager.data?.response || 0,
    totalOrder: totalOrder.data?.response || 0,
    totalOrderPending: totalOrderPending.data?.response || 0,
  };
};

export default useDashboardData;

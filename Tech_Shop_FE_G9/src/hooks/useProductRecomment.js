// hooks/useProductRecommendations.js
import { useQuery } from "@tanstack/react-query";
import { getAllProductRecommendation } from "../services/productRecommentService";

const useProductRecommendations = () => {
  const productsRecommendation = useQuery({
    queryKey: ["productRecommendations"],
    queryFn: getAllProductRecommendation,
  });

  return {
    productsRcm: productsRecommendation?.data?.response || [],
    isLoading: productsRecommendation.isLoading,
    isError: productsRecommendation.isError,
  }
};

export default useProductRecommendations;

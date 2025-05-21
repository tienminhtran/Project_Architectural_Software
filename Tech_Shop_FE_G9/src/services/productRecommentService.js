import React from "react";
import axiosInstance from "../api/axios";

// get all product recommendation
export const getAllProductRecommendation = async () => {
  const response = await axiosInstance.get("/products-recommendation/all");
  return response.data;
};
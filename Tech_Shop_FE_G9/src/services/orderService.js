import React from "react";
import axiosInstance from "../api/axios";

export const getTotalProductSold = async () => {

    const response = await axiosInstance.get('/orders/total-product-sold');
    return response.data;
};
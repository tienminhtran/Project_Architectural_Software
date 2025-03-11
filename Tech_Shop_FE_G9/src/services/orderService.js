import React from "react";
import axiosInstance from "../api/axios";

export const getTotalProductSold = async () => {

    const response = await axiosInstance.get('/orders/total-product-sold');
    return response.data;
};

export const getTotalOrder = async () => {

    const response = await axiosInstance.get('/orders/total');
    return response.data;
};

export const getTotalOrderPending = async () => {

    const response = await axiosInstance.get('/orders/totalOrderPending');
    return response.data;
};
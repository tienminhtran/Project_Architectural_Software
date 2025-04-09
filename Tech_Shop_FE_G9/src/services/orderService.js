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

export const getRecentOrders = async () => {

    const response = await axiosInstance.get('/orders/recently');
    return response.data;
};

export const getDailyOrders = async () => {

    const response = await axiosInstance.get('/reports/daily');
    return response.data;
};

export const getDailyCategory = async () => {

    const response = await axiosInstance.get('/reports/daily-category');
    return response.data;
};
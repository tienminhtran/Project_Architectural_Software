import React from "react";
import axiosInstance from "../api/axios";

export const getTotalProductSold = async () => {
    const response = await axiosInstance.get("/orders/total-product-sold");
    return response.data;
};

export const getTotalOrder = async () => {
    const response = await axiosInstance.get("/orders/total");
    return response.data;
};

export const getTotalOrderPending = async () => {
    const response = await axiosInstance.get("/orders/totalOrderPending");
    return response.data;
};

export const getRecentOrders = async () => {
    const response = await axiosInstance.get("/orders/recently");
    return response.data;
};

export const getDailyOrders = async () => {
    const response = await axiosInstance.get("/reports/daily");
    return response.data;
};

export const getDailyCategory = async () => {
    const response = await axiosInstance.get("/reports/daily-category");
    return response.data;
};

export const getAllOrder_Paging = async (pageNo, pageSize) => {
    const response = await axiosInstance.get(
        `/orders?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    return response.data;
};

export const deleteOrder = async (id) => {
    const response = await axiosInstance.delete(`/orders/${id}`);
    return response.data;
};

export const getTotalAmountByOrderId = async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}/total-amount`);
    return response.data;
};

export const searchOrder = async (pageNo, pageSize, keyword) => {
    const response = await axiosInstance.get(
        `/orders/search/${keyword}?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    return response.data;
};

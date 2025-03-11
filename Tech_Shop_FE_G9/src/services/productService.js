import React from "react";
import axiosInstance from "../api/axios";

export const getRenevenue = async () => {

    const response = await axiosInstance.get('/products/revenue');
    return response.data;
};

export const getTotalProduct = async () => {

    const response = await axiosInstance.get('/products/count');
    return response.data;
};

export const getProductsBestSeller = async () => {

    const response = await axiosInstance.get('/products/bestSelling');
    return response.data;
};

export const getRecentlyProductAdd = async () => {

    const response = await axiosInstance.get('/products/recent');
    return response.data;
};
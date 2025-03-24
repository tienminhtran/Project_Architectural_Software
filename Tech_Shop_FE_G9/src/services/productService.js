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

export const getAllProduct_Paging = async (pageNo, pageSize) => {

    const response = await axiosInstance.get(`/products?pageNo=${pageNo}&pageSize=${pageSize}`);
    return response.data;
};

export const deleteProduct = async (id) => {
    
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
};

// seach keyword
export const searchProduct = async (keyword) => {
    
    const response = await axiosInstance.get(`/products/search?keyword=${keyword}`);
    return response.data;
};


 export const createProduct = async (product) => {
    console.log("product service", product);
    const response = await axiosInstance.post('/products', product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log("Product created:", response.data);
    return response.data;
}

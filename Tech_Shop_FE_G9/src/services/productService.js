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
export const searchProduct = async (pageNo, pageSize,keyword) => {
    
    const response = await axiosInstance.get(`/products/search/${keyword}?pageNo=${pageNo}&pageSize=${pageSize}`);
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

 export const updateProduct = async (product, id) => {
    console.log("product service update", product);
    const response = await axiosInstance.put(`/products/${id}`, product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log("Product updated:", response.data);     
    return response.data;
}

 export const filterProductLaptop = async () => {
    
    try {
        const response = await axiosInstance.get('/products/filter-laptop');
        console.log("Filtered laptop products:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error filtering laptop products:", error);
        throw error; 
    }
}
 export const filterProductPhone = async () => {
    
    try {
        const response = await axiosInstance.get('/products/filter-phone');
        console.log("Filtered phone products:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error filtering phone products:", error);
        throw error; 
    }
}

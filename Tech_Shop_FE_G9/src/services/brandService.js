import React from "react";
import axiosInstance from "../api/axios";

export const getBrandAll = async () => {
    const response = await axiosInstance.get("/brands/all");
    return response.data;
};

export const getAllBrand_Paging = async (pageNo, pageSize) => {
    const response = await axiosInstance.get(
        `/brands?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    return response.data;
};

export const deleteBrand = async (id) => {
    const response = await axiosInstance.delete(`/brands/${id}`);
    return response.data;
};

export const createBrand = async (brand) => {
    const response = await axiosInstance.post("/brands", brand, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    console.log("Brand created:", response.data);
    return response.data;
};

export const updateBrand = async (brand, id) => {
    console.log("brand service update", brand);
    const response = await axiosInstance.put(`/brands/${id}`, brand, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    console.log("Brand updated:", response.data);
    return response.data;
};

export const searchBrand = async (pageNo, pageSize, keyword) => {
    const response = await axiosInstance.get(
        `/brands/search/${keyword}?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    return response.data;
};

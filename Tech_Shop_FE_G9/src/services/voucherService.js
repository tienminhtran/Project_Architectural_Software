import React from "react";
import axiosInstance from "../api/axios";

export const getTotalAvailVoucher = async () => {

    const response = await axiosInstance.get('/voucher/countAvail');
    return response.data;
};

export const getAllVouchers_Paging = async (pageNo, pageSize) => {

    const response = await axiosInstance.get(`/voucher?pageNo=${pageNo}&pageSize=${pageSize}`);
    return response.data;
};

export const createVoucher = async (voucher) => {
    
    const response = await axiosInstance.post('/voucher', voucher);
    return response.data;
};
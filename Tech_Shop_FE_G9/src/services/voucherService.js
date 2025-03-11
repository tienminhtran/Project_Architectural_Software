import React from "react";
import axiosInstance from "../api/axios";

export const getTotalAvailVoucher = async () => {

    const response = await axiosInstance.get('/voucher/countAvail');
    return response.data;
};
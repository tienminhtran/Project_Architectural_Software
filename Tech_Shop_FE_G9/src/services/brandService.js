import React from "react";
import axiosInstance from "../api/axios";

export const getBrandAll = async () => {

    const response = await axiosInstance.get('/brands/all');
    return response.data;
};
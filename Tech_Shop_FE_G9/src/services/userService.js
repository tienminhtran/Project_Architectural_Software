import React from "react";
import axiosInstance from "../api/axios";

export const getUsers = async (username) => {

    const response = await axiosInstance.get(`/user/information/${username}`);
    return response.data;
};

export const getLoyalCustomers = async () => {
    const response = await axiosInstance.get('/user/topCustomers');
    return response.data;
}
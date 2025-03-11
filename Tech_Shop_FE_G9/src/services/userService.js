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

export const countUserByRoleUser = async () => {
    const response = await axiosInstance.get('/user/countByRoleUser');
    return response.data;
}
export const countUserByRoleManager = async () => {
    const response = await axiosInstance.get('/user/countByRoleManager');
    return response.data;
}
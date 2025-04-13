import React from "react";
import axiosInstance from "../api/axios";


export const createCode = async (code) => {
    
    const response = await axiosInstance.post('/code', code);
    return response.data;
};

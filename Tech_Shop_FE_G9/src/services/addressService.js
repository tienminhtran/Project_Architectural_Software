import axiosInstance from "../api/axios";

// Tìm kiếm địa chỉ theo ID người dùng
export const getAddressById = async (id) => {
  try {
    const response = await axiosInstance.get(`/address/user/${id}`);
    return response.data; // giả sử là mảng địa chỉ
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};


// services/addressService.js

export const createAddress = async ({ userId, ...data }) => {
    const response = await axiosInstance.post(`/address/${userId}`, data);
    return response.data.response;
  };
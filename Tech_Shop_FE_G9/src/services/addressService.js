

import axiosInstance from "../api/axios";

// Tìm kiếm địa chỉ theo ID người dùng
export const getAddressById = async (id) => {
  try {
    console.log("Fetching addresses for user ID:", id);
    const response = await axiosInstance.get(`/address/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};

// Thêm địa chỉ mới
export const createAddress = async ({ userId, ...data }) => {
  console.log("Creating address for user ID:", userId, "with data:", data);
  const response = await axiosInstance.post(`/address/${userId}`, data);
  return response.data;
};

// Cập nhật trạng thái địa chỉ
export const updateAddressStatus = async (id) => {
  console.log("Updating status for address ID:", id);
  const response = await axiosInstance.put(`/address/status/${id}`);
  return response.data;
};

// Cập nhật thông tin địa chỉ
export const updateAddress = async (idAddress, data) => {
  if (!idAddress || isNaN(idAddress)) {
    console.error("Invalid address ID in updateAddress:", idAddress);
    throw new Error("Invalid address ID");
  }
  console.log("Sending PUT request to:", `/address/${idAddress}`, "with data:", data);
  const response = await axiosInstance.put(`/address/${idAddress}`, data);
  return response.data;
};
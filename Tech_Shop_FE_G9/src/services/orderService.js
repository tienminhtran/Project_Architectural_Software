import React from "react";
import axiosInstance from "../api/axios";

export const getTotalProductSold = async () => {
  const response = await axiosInstance.get("/orders/total-product-sold");
  return response.data;
};

export const getTotalOrder = async () => {
  const response = await axiosInstance.get("/orders/total");
  return response.data;
};

export const getTotalOrderPending = async () => {
  const response = await axiosInstance.get("/orders/totalOrderPending");
  return response.data;
};

export const getRecentOrders = async () => {
  const response = await axiosInstance.get("/orders/recently");
  return response.data;
};

export const getDailyOrders = async () => {
  const response = await axiosInstance.get("/reports/daily");
  return response.data;
};

export const getDailyCategory = async () => {
  const response = await axiosInstance.get("/reports/daily-category");
  return response.data;
};

export const getAllOrder_Paging = async (pageNo, pageSize) => {
  const response = await axiosInstance.get(
    `/orders?pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axiosInstance.delete(`/orders/${id}`);
  return response.data;
};

export const getTotalAmountByOrderId = async (orderId) => {
  const response = await axiosInstance.get(`/orders/${orderId}/total-amount`);
  return response.data;
};

//http://localhost:8080/api/v1/orders/me/phone/0367494904
export const fetchOrderByPhoneNumber = async (phoneNumber) => {
  if (!phoneNumber) return [];

  try {
    const response = await axiosInstance.get(`/orders/me/phone/${phoneNumber}`);

    // Backend trả về 204 No Content khi không có đơn hàng, axios sẽ throw error,
    // nên ta cần xử lý ở catch hoặc kiểm tra response.status trước (nhưng axios không expose status 204 như fetch)
    // Nên backend có thể sửa trả 200 kèm mảng rỗng hoặc ta xử lý lỗi 204 như sau:

    return response.data.response || [];
  } catch (error) {
    if (error.response && error.response.status === 204) {
      // No Content
      return [];
    }
    throw error;
  }
};

export const filterOrderAll = async (
  pageNo,
  pageSize,
  firstname,
  phoneNumber,
  payment,
  status
) => {
  const response = await axiosInstance.get(
    `/orders/filter/all?firstname=${firstname}&phoneNumber=${phoneNumber}&payment=${payment}&status=${status}&pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/orders/create", orderData);
  return response.data;
};

export const getUserOrdersByStatus = async (userId, status) => {
  try {
    const url =
      status === "TẤT CẢ"
        ? `/orders/user/${userId}`
        : `/orders/user/${userId}?status=${status}`;

    const response = await axiosInstance.get(url);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export const cancelOrder = async (orderId) => {
  const response = await axiosInstance.put(`/orders/${orderId}/cancel`);
  return response.data;
};

import axiosInstance from "../api/axios";

export const getOrderDetailByOrderId = async (orderId) => {
  const response = await axiosInstance.get(`/order-detail/${orderId}`);
  console.log("Order Detail Response:", response.data); // Log the response data
  return response.data;
};

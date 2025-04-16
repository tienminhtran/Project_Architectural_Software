import axiosInstance from "../api/axios";

export const getOrderDetailById = async (orderId) => {
    const response = await axiosInstance.get(`/order-detail/${orderId}`);
    return response.data;
};

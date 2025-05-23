import React from "react";
import axiosInstance from "../api/axios";

export const getUserInfo = async (username) => {
  const response = await axiosInstance.get(`/user/information/${username}`);
  return response.data;
};

export const getAllUsersPaging = async (pageNo, pageSize) => {
  const response = await axiosInstance.get(
    `/user?pageNo=${pageNo}&pageSize=${pageSize}`
  );
  return response.data;
};

export const getAllUsersNoPage = async () => {
  const response = await axiosInstance.get(`/user/all`);
  return response.data;
};

export const createUserRoleManager = async (userFormData) => {
  const response = await axiosInstance.post(
    "/user/createManager",
    userFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getUsers_Auth = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return;

  const response = await axiosInstance.get("/user/roles-user");
  return response.data;
};

export const getCurrentUser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return;

  try {
    const response = await axiosInstance.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getLoyalCustomers = async () => {
  const response = await axiosInstance.get("/user/topCustomers");
  return response.data;
};

export const countUserByRoleUser = async () => {
  const response = await axiosInstance.get("/user/countByRoleUser");
  return response.data;
};
export const countUserByRoleManager = async () => {
  const response = await axiosInstance.get("/user/countByRoleManager");
  return response.data;
};

export const updateProfile = async (id, userFormData) => {
  console.log("Id", id);
  const response = await axiosInstance.put(`/user/${id}`, userFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const checkPhoneExistsService = async (phone) => {
  try {
    console.log("Checking phone:", phone);
    const response = await axiosInstance.post("/user/check-phone", { phone });
    console.log("Check phone response:", response);
    console.log("Check phone exists response:", response.data);
    return response.data.exists; // Trả về boolean
  } catch (error) {
    console.error(
      "Error checking phone:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Lỗi khi kiểm tra số điện thoại"
    );
  }
};

export const resetPasswordService = async ({ idToken, newPassword }) => {
  const response = await axiosInstance.post("/user/reset-password", {
    idToken,
    newPassword,
  });
  return response.data;
};

export const getAllUserHasOrder = async () => {
  const response = await axiosInstance.get("/user/allUserHasOrder");
  return response.data;
};

export const getAllUserRole1 = async () => {
  const response = await axiosInstance.get("/user/allUserRole1");
  return response.data;
};

//getAllUserRole1AndNoOrder
export const getAllUserRole1AndNoOrder = async () => {
  const response = await axiosInstance.get("/user/allUserRole1AndNoOrder");
  return response.data;
};

// http://localhost:8080/api/v1/user/updateStatus/10
export const updateStatusUser = async (id) => {
  const response = await axiosInstance.put(`/user/updateStatus/${id}`);
  return response.data;
};

//http://localhost:8080/api/v1/user/notify?email=tientot36@gmail.com&nameuser=12334
export const sendEmailNotify = async ({ email, id }) => {
  const response = await axiosInstance.get(
    `/user/notify?email=${email}&id=${encodeURIComponent(id)}`
  );
  return response.data;
};

//http://localhost:8080/api/v1/user/findUsersWithEmailNotificationDate10DaysAgo
export const findUsersWithEmailNotificationDate10DaysAgo = async () => {
  const response = await axiosInstance.get(
    `/user/findUsersWithEmailNotificationDate10DaysAgo`
  );
  return response.data;
};

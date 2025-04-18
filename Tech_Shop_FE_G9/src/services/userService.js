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

  const response = await axiosInstance.get("/user/me");
  return response.data;
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

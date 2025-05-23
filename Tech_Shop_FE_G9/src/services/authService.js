import React from "react";

import axiosInstance from "../api/axios";


export const saveAccessToken = (token) => {
  localStorage.setItem("accessToken", token); // Lưu token vào localStorage
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken"); // Lấy token từ localStorage
};
export const saveRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token); // Lưu refresh token vào localStorage
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken"); // Lấy refresh token từ localStorage
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken"); // Xóa token khỏi localStorage
  localStorage.removeItem("refreshToken");
  
};

export const login = async (credential) => {
  //     const response = await axios.post(API_URL + "/login", credential);
  //     if (response.data.status === 200) {
  //         const data = response.data.token;
  //         localStorage.setItem("username", data.username);
  //         localStorage.setItem("accessToken", data.accessToken);
  //         localStorage.setItem("refreshToken", data.refreshToken);
  //         localStorage.setItem("roles", JSON.stringify(data.roles));
  //     } else {
  //         localStorage.setItem("message", response.data.message);
  //     }
  try {
    const response = await axiosInstance.post("/auth/login", credential);
    return response.data; // Trả về { user, token, role }
  } catch (error) {
    console.error("Login error:", error.response.data);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

export const loginGoogle = async (idToken) => {
  try {
    const response = await axiosInstance.post("/auth/login/google", {
      idToken,
    });
    return response.data; // Trả về { user, token, role }
  } catch (error) {
    console.error("Login error:", error.response.data);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

export const register = async (user) => {
  const response = await axiosInstance.post("/auth/register", user);
  return response.data;
};

import React from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth";

export const saveAccessToken = (token) => {
  localStorage.setItem("accessToken", token); // Lưu token vào localStorage
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken"); // Lấy token từ localStorage
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken"); // Xóa token khỏi localStorage
};

// Tạo một instance của axios với baseURL là API_URL
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Tạo một interceptor cho axiosInstance để tự đông  thêm token vào header mỗi khi có request tới
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

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
  const response = await axiosInstance.post('/login', credential);
  return response.data; // Trả về { user, token, role }
};

export const register = async (user) => {
  const response = await axiosInstance.post('/register', user);
  return response.data;
}

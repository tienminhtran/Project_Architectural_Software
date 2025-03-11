import React from "react";

import axiosInstance from "../api/axios";


export const saveAccessToken = (token) => {
  localStorage.setItem("accessToken", token); // Lưu token vào localStorage
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken"); // Lấy token từ localStorage
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken"); // Xóa token khỏi localStorage
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
  const response = await axiosInstance.post('/auth/login', credential);
  return response.data; // Trả về { user, token, role }
};

export const register = async (user) => {
  const response = await axiosInstance.post('/auth/register', user);
  return response.data;
}

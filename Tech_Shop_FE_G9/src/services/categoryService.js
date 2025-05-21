import React from "react";
import axiosInstance from "../api/axios";

export const getAllCategories_Paging = async (pageNo, pageSize) => {
  try {
    const response = await axiosInstance.get(
      `/category?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    console.log("Category Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");
    console.log("All Categories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    console.log("Category deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axiosInstance.post("/category", category);
    console.log("Category created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (category) => {
  try {
    const response = await axiosInstance.put(
      `/category/${category.id}`,
      category
    );
    console.log("Category updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// search keywork (name or description)
export const searchCategory = async (keyword) => {
  try {
    const response = await axiosInstance.get(`/category/search/${keyword}`);
    console.log("Category search result:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching category:", error);
    throw error;
  }
};

export const getAll_NoPaging = async () => {
  const response = await axiosInstance.get("/category/all");
  return response.data;
};

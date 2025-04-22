import axiosInstance from "../api/axios";

export const getItemCartUser= async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
  
    try {
      const response = await axiosInstance.get("/cart/me/items");
      return response.data;
    } catch (error) {
      console.error("Error fetching items cart user:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };
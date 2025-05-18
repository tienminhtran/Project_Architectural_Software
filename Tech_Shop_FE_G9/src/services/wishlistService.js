import axiosInstance from "../api/axios";
export const getItemWishlistUser = async () => {
  try {
    const response = await axiosInstance.get("/wishlists/me/items");
    return response.data;
  } catch (error) {
    console.error("Error fetching items wishlist user:", error);
    throw error;
  }
};

export const addItemToWishlist = async (request) => {
  try {
    const response = await axiosInstance.post("/wishlists/add", request);
    return response.data;
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    throw error;
  }
};

export const deleteItemWishlist = async (id) => {
  try {
    const response = await axiosInstance.delete(`/wishlists/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item from wishlist:", error);
    throw error;
  }
};

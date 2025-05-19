import axiosInstance from "../api/axios";

export const getItemCartUser = async () => {

  try {
    const response = await axiosInstance.get("/cart/me/items");
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching items cart user:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const addItemToCart = async (request) => {
  try {
    const response = await axiosInstance.post("/cart/add",  request );
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const deleteItemToCart = async (id) => {
  try {
    const response = await axiosInstance.delete(`/cart/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    throw error; 
  }
};
export const updateQuatityItemCart = async (id, quantity) => {
  console.log("id", id);
  console.log("quantity", quantity);
  try {
    const response = await axiosInstance.put(`/cart/${id}/update`, {
      quantity: Number(quantity),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating item quantity in cart:", error);
    throw error; 
  }
};

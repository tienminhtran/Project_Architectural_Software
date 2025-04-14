import axiosInstance from "../api/axios";

// Tạo mã code
export const createCode = async (codeData = {}) => {
  try {
    const { code, active = true } = codeData;

    const res = await axiosInstance.post('/code', {
      code,
      active
    });

    console.log("Full response from API:", res.data);

    return res.data.response; // Trả về toàn bộ object: { id, code, active }
  } catch (error) {
    console.error("Error creating code:", error);

    if (error.response) {
      throw new Error(error.response.data.message || "Error from server. Please try again!");
    } else if (error.request) {
      throw new Error("Unable to connect to server. Please try again!");
    } else {
      throw new Error("An error occurred. Please try again!");
    }
  }
};

// Xóa mã code
export const deleteCode = async (id) => {
  try {
    const res = await axiosInstance.delete(`/code/${id}`);
    console.log("✔️ Delete successful:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Delete failed:", err.response?.data || err.message);
    throw err;
  }
};

// Lấy tất cả mã code
export const getAllCodes = async () => {
  const res = await axiosInstance.get('/code/all');
  console.log("Code list:", res.data);
  return res.data;
};

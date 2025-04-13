import axiosInstance from "../api/axios"; // Import axiosInstance đã cấu hình

// Hàm gửi yêu cầu POST đến API để tạo mã code
export const createCode = async (codeData = {}) => {
  try {
    // Lấy dữ liệu từ codeData, ví dụ: mã code và trạng thái active
    const { code, active = true } = codeData; 

    // Gửi yêu cầu POST tới API
    const res = await axiosInstance.post('/code', { code, active });

    // Kiểm tra dữ liệu trả về từ API
    console.log("Full response từ API:", res.data);

    // Trả về mã code từ response của API
    return res.data.response.code; // Giả sử API trả về mã code trong trường hợp response.response.code
  } catch (error) {
    // Kiểm tra lỗi và ném lỗi về phía trên (cho phép bắt ở nơi gọi hàm)
    console.error("Có lỗi trong quá trình tạo mã code:", error);
    
    if (error.response) {
      // Khi có lỗi từ phía server (ví dụ: lỗi 400, 500...)
      console.error("Chi tiết lỗi từ server:", error.response.data);
      throw new Error(error.response.data.message || "Lỗi từ server. Vui lòng thử lại!");
    } else if (error.request) {
      // Khi không nhận được phản hồi từ server (lỗi mạng, timeout...)
      console.error("Không nhận được phản hồi từ server:", error.request);
      throw new Error("Không thể kết nối tới server. Vui lòng thử lại!");
    } else {
      // Khi có lỗi khác không thuộc 2 loại trên
      console.error("Lỗi không xác định:", error.message);
      throw new Error("Đã xảy ra lỗi. Vui lòng thử lại!");
    }
  }
};

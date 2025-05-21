import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from "../services/authService";
// const API_URL = "http://13.213.62.201:8082/api/v1";

const API_URL = "https://api.tranminhtien.io.vn/api/v1";
// const API_URL = "http://localhost:8080/api/v1";

// Tạo một instance của axios với baseURL là API_URL
const axiosInstance = axios.create({
  baseURL: API_URL,
  // withCredentials: true // Để gửi cookie cùng với request
});

// Tạo một interceptor cho axiosInstance để tự đông  thêm token vào header mỗi khi có request tới
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !(
        originalRequest.url.includes("/api/v1/auth/refresh") ||
        originalRequest.url.includes("/api/v1/auth/login")
      )
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });
          if (response.status === 200) {
            const newAccessToken = response.data.token.accessToken;

            console.log("New access token:", newAccessToken);
            saveAccessToken(newAccessToken); // Lưu access token mới vào localStorage

            // Cập nhật access token cho các request tiếp theo
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            // Thử lại request ban đầu với access token mới
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          }
        } catch (err) {
          console.error("Error refreshing token:", err);
          // Nếu refresh token không thành công, có thể xóa token và chuyển hướng đến trang đăng nhập
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.replace("/login");
        }
      }
    }

    console.error("API call failed:", error);

    return Promise.reject(error);
  }
);

export default axiosInstance;

import { useMutation } from "@tanstack/react-query";
import { createCode } from "../services/codeService"; // Import hàm createCode từ codeService

const useCode = () => {
  // Sử dụng useMutation để thực hiện mutation và xử lý các trạng thái như onSuccess, onError
  const create = useMutation({
    mutationFn: (formData) => createCode(formData),  // Hàm gọi service để tạo mã
    onSuccess: () => {
      alert("Tạo mã CODE thành công!");
    },
    onError: (error) => {
      console.error("Tạo mã CODE thất bại:", error);
      if (error.response) {
        console.error("Chi tiết lỗi từ server:", error.response.data);
        alert(`Lỗi từ server: ${error.response.data.message || 'Vui lòng thử lại'}`);
      } else {
        alert("Tạo mã thất bại. Vui lòng thử lại!");
      }
    },
  });

  // Trả về hàm mutateAsync từ useMutation để sử dụng async/await
  return {
    createCode: create.mutateAsync, // sử dụng mutateAsync để sử dụng async/await
  };
};

export default useCode;

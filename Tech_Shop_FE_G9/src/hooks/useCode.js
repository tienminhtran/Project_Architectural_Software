import { useMutation } from "@tanstack/react-query";
import { createCode, deleteCode, getAllCodes } from "../services/codeService";

const useCode = () => {
  const create = useMutation({
    mutationFn: (formData) => createCode(formData),
    onSuccess: (data) => {
      alert("Tạo mã CODE thành công!");
      console.log("Mã CODE được tạo:", data);
    },
    onError: (error) => {
      console.error("Tạo mã CODE thất bại:", error);
      if (error.response) {
        alert(`Lỗi từ server: ${error.response.data.message || 'Vui lòng thử lại'}`);
      } else {
        alert("Tạo mã thất bại. Vui lòng thử lại!");
      }
    },
  });

  const deleteCodes = useMutation({
    mutationFn: (id) => deleteCode(id),
    onSuccess: () => {
      alert("Xóa mã CODE thành công!");
    },
    onError: (error) => {
      console.error("Xóa mã CODE thất bại:", error);
      alert("Xóa mã CODE thất bại. Vui lòng thử lại!");
    },
  });

  const checkCodeStatus = async (inputCode) => {
    try {
      const allCodes = await getAllCodes();
      const foundCode = allCodes.find(c => c.code === inputCode);

      if (!foundCode) {
        return { status: "not_found", message: "Mã không tồn tại" };
      }

      if (!foundCode.active) {
        return { status: "inactive", message: "Mã đã hết hạn, vui lòng liên hệ Admin" };
      }

      return { status: "valid", data: foundCode };
    } catch (error) {
      console.error("Lỗi kiểm tra mã code:", error);
      return { status: "error", message: "Đã xảy ra lỗi khi kiểm tra mã" };
    }
  };

  return {
    createCode: create.mutateAsync,
    deleteCode: deleteCodes.mutateAsync,
    getAllCode: getAllCodes,
    checkCodeStatus,
  };
};

export default useCode;

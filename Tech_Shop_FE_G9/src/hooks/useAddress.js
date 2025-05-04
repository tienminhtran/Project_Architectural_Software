// hooks/useAddress.js
import { useMutation } from "@tanstack/react-query";
import { getAddressById, createAddress } from "../services/addressService";

const useAddress = () => {
  const getAddress = useMutation({
    mutationFn: getAddressById,
    onSuccess: (data) => {
      console.log("Địa chỉ:", data);
    },
    onError: (error) => {
      console.error("Lỗi lấy địa chỉ:", error);
    },
  });

  const addAddress = useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      console.log("Đã thêm địa chỉ:", data);
      alert("Thêm địa chỉ thành công!");
    },
    onError: (error) => {
      console.error("Lỗi khi thêm địa chỉ:", error);
      alert("Thêm địa chỉ thất bại.");
    },
  });

  return {
    getAddress: getAddress.mutateAsync,
    addAddress: addAddress.mutateAsync,
  };
};

export default useAddress;

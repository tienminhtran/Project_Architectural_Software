import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllVouchers_Paging,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  searchVoucher,
} from "../services/voucherService";
import usePaginationQuery from "./usePaginationQuery";

const useVoucher = (pageNo, pageSize, voucherSearch) => {
  const queryClient = useQueryClient();

  // Sử dụng useMutation để tạo mới voucher
  const create = useMutation({
    mutationFn: (formData) => createVoucher(formData),
    onSuccess: () => {
      alert("Create voucher successfully!!");
    },
    onError: (error) => {
      console.error("Create voucher failed:", error);
      alert("Create voucher fail. Please try again!");
    },
  });

  // update voucher
  const update = useMutation({
    mutationFn: (formData) => updateVoucher(formData),
    onSuccess: () => {
      // Refetch của voucher sau khi update thành công.
      // Mà không cần reload
      queryClient.invalidateQueries("getAllVouchers_Paging");

      alert("Update voucher successfully!!");
    },
    onError: (error) => {
      console.error("Update voucher failed:", error);
      alert("Update voucher fail. Please try again!");
    },
  });

  // delete voucher
  const deleteVou = useMutation({
    mutationFn: (id) => deleteVoucher(id),
    onSuccess: () => {
      // Refetch của voucher sau khi update thành công.
      // Mà không cần reload
      queryClient.invalidateQueries("getAllVouchers_Paging");

      alert("Delete voucher successfully!!");
    },
    onError: (error) => {
      console.error("Delete voucher failed:", error);
      alert("Delete voucher fail. Please try again!");
    },
  });

  //seach voucher

  return {
    vouchers_paging: usePaginationQuery(
      "getAllVouchers_Paging",
      getAllVouchers_Paging,
      pageNo,
      pageSize
    ),
    createVoucher: create.mutate,
    updateVoucher: update.mutate,
    deleteVoucher: deleteVou.mutate,
    search_paging: usePaginationQuery(
      "searchVoucher",
      searchVoucher,
      pageNo,
      pageSize,
      voucherSearch
    ),
  };
};

export default useVoucher;

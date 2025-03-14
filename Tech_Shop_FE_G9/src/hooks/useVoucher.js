import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllVouchers_Paging, createVoucher } from "../services/voucherService";
import usePaginationQuery from "./usePaginationQuery";

const useVoucher = (pageNo, pageSize) => {

  const create = useMutation({
    mutationFn: (formData) => createVoucher(formData),
    onSuccess: () => {
      alert("Create voucher successfully!!");
    },
    onError: (error) => {
      console.error("Create voucher failed:", error);
      alert("Create voucher fail. Please try again!");
    },
  })

  return {
    vouchers_paging: usePaginationQuery("getAllVouchers_Paging", getAllVouchers_Paging, pageNo, pageSize),
    createVoucher: create.mutate,
  };
};


export default useVoucher;

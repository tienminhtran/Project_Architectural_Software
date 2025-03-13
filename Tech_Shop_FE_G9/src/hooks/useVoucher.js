import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllVouchers_Paging } from "../services/voucherService";
import usePaginationQuery from "./usePaginationQuery";

const useVoucher = (pageNo, pageSize) => {

  return {
    vouchers_paging: usePaginationQuery("getAllVouchers_Paging", getAllVouchers_Paging, pageNo, pageSize),
  };
};

export default useVoucher;

import { useQuery } from "@tanstack/react-query";

const usePaginationQuery = (queryKey, fetchFn, pageNo, pageSize, keySearch="") => {

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [queryKey, keySearch, pageNo, pageSize],
    queryFn: () => fetchFn(pageNo, pageSize, keySearch),

    keepPreviousData: true, // Giữ lại dữ liệu cũ khi chuyển trang
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchInterval: 10000, // Tự động fetch mỗi 10 giây
    staleTime: 30000, // Trong 30 giây không gọi lại API nếu dữ
    cacheTime: 60000, // Lưu cache trong 60 giây trước khi xóa
  });

  return {
    
    data: data?.response || {},
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default usePaginationQuery;

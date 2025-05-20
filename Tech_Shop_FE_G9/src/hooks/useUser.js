import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserInfo,
  updateProfile,
  getAllUsersPaging,
  createUserRoleManager,
  checkPhoneExistsService,
  getAllUserHasOrder,
  getAllUserRole1,
  getAllUserRole1AndNoOrder,


  // getAllUsersNoPage,
} from "../services/userService";
import usePaginationQuery from "./usePaginationQuery";
import { resetPasswordService, getCurrentUser } from "../services/userService";


const useUser = (pageNo, pageSize) => {
  const queryClient = useQueryClient();

  const getUser = useQuery({
    queryKey: ["getUser"], // Dùng user là username làm key của query
    queryFn: () => getCurrentUser(),
    refetchOnWindowFocus: false,
  });

  const userPaging = usePaginationQuery(
    "getAllUsersPaging",
    getAllUsersPaging,
    pageNo ?? 0,
    pageSize ?? 10
  );

  const createRoleManager = useMutation({
    mutationFn: (formData) => createUserRoleManager(formData),
    onSuccess: () => {
      alert("Create user role manager successfully!!");
    },
    onError: (error) => {
      console.error("Create user role manager failed:", error);
      alert("Create user role manager fail. Please try again!");
    },
  });


  //sử dụng useMuntation để update thông tin user
  const updateProfileUser = useMutation({
    mutationFn: ({ userid, formData }) => {
      return updateProfile(userid, formData);
    }, // Gọi API update user, munationFn nhận vào 1 object có 2 key là userid và formData
    onSuccess: (data) => {
      // Cập nhật lại cache của user sau khi update thành công
      queryClient.setQueryData(["getUser"], (oldData) => ({
        ...oldData,
        response: { ...oldData?.response, ...data },
      }));
      queryClient.invalidateQueries(["getUser"]); // Invalidate the query to refetch the user data
      queryClient.invalidateQueries(["getAllUsersPaging"]); // Invalidate the query to refetch the user data
    },
    onError: (error) => {
      console.error("Update user failed:", error);
      alert("Update failed. Please try again!");
    },
  });
  const resetPassword = useMutation({
    mutationFn: ({ idToken, newPassword }) => {
      return resetPasswordService({ idToken, newPassword });
    },
    onSuccess: () => {
      alert("Reset password successfully!");
    },
    onError: (error) => {
      console.error("Reset password failed:", error);
      alert("Reset password failed. Please try again!");
    },
  });

  // Mutation để kiểm tra số điện thoại đã tồn tại hay chưa
  const {
    mutate: checkPhoneExists,
    mutateAsync: checkPhoneExistsAsync,
    isLoading: isCheckingPhone,
    isError: isCheckPhoneError,
    error: checkPhoneError,
  } = useMutation({
    mutationFn: checkPhoneExistsService,
    onError: (error) => {
      console.log(error.message || "Lỗi khi kiểm tra số điện thoại");
    },
  });

  // getAllUserHasOrder 
  const getAllUserHasOrderPaging = useQuery({
    queryKey: ["getAllUserHasOrder"],
    queryFn: () => getAllUserHasOrder(),
    refetchOnWindowFocus: false,
  });

  // getAllUserRole1
  const getAllUserRole1Paging = useQuery({
    queryKey: ["getAllUserRole1"],
    queryFn: () => getAllUserRole1(),
    refetchOnWindowFocus: false,
  });

  // getAllUserRole1AndNoOrder
  const getAllUserRole1AndNoOrderPaging = useQuery({
    queryKey: ["getAllUserRole1AndNoOrder"],
    queryFn: () => getAllUserRole1AndNoOrder(),
    refetchOnWindowFocus: false,
  });



  return {
    user_paging: userPaging,
    // user_nopaging: userNoPaging,
    createManager: createRoleManager,
    userInfor: getUser.data?.response || {},
    updateUser: updateProfileUser.mutateAsync,
    resetPassword: resetPassword.mutate,
    checkPhoneExists,
    checkPhoneExistsAsync,

    getAllUserHasOrderPaging,
    getAllUserRole1Paging,
    isLoadingUser: getUser.isLoading,
    isLoadingUserPaging: userPaging.isLoading,
    isLoadingUserHasOrder: getAllUserHasOrderPaging.isLoading,
    isLoadingUserRole1: getAllUserRole1Paging.isLoading,
    getAllUserRole1AndNoOrderPaging,
    isLoadingUserRole1AndNoOrder: getAllUserRole1AndNoOrderPaging.isLoading,
    isCheckingPhone,
    isCheckPhoneError,
    checkPhoneError,
    loadingUpdateUser: updateProfileUser.isLoading,
    
  };
};
export default useUser;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserInfo,
  updateProfile,
  getAllUsersPaging,
  createUserRoleManager,
  checkPhoneExistsService,
  // getAllUsersNoPage,
} from "../services/userService";
import { useSelector } from "react-redux";
import usePaginationQuery from "./usePaginationQuery";
import { resetPasswordService } from "../services/userService";

const useUser = (pageNo, pageSize) => {
  const { user } = useSelector((state) => state.auth);
  console.log("user name ", user);
  const queryClient = useQueryClient();

  const getUser = useQuery({
    queryKey: ["getUser", user], // Dùng user là username làm key của query
    queryFn: () => getUserInfo(user),
    enabled: !!user, // Chỉ gọi API nếu user có giá trị
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
      queryClient.setQueryData(["getUser", user], (oldData) => ({
        ...oldData,
        response: { ...oldData?.response, ...data },
      }));
      queryClient.invalidateQueries(["getUser", user]); // Invalidate the query to refetch the user data
      queryClient.invalidateQueries(["getAllUsersPaging"]); // Invalidate the query to refetch the user data
      
      alert("Update user successfully!!");
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

  return {
    user_paging: userPaging,
    // user_nopaging: userNoPaging,
    createManager: createRoleManager,
    userInfor: getUser.data?.response || {},
    updateUser: updateProfileUser.mutate,
    resetPassword: resetPassword.mutate,
    checkPhoneExists,
    checkPhoneExistsAsync,
    isCheckingPhone,
    isCheckPhoneError,
    checkPhoneError,
  };
};
export default useUser;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserInfo,
  updateProfile,
  getAllUsersPaging,
  createUserRoleManager,
  // getAllUsersNoPage,
} from "../services/userService";
import { useSelector } from "react-redux";
import usePaginationQuery from "./usePaginationQuery";

const useUser = (pageNo, pageSize) => {
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const getUser = useQuery({
    queryKey: ["getUser", user], // Dùng user là username làm key của query
    queryFn: () => getUserInfo(user),
    enabled: !!user, // Chỉ gọi API nếu user có giá trị
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

  // const userNoPaging = useQuery({
  //   queryKey: ["getAllUsersNoPage"],
  //   queryFn: getAllUsersNoPage,
  // });
  //sử dụng useMuntation để update thông tin user
  const updateProfileUser = useMutation({
    mutationFn: ({ userid, formData }) => {
      updateProfile(userid, formData);
    }, // Gọi API update user, munationFn nhận vào 1 object có 2 key là userid và formData
    onSuccess: (data) => {
      // Cập nhật lại cache của user sau khi update thành công
      queryClient.setQueryData(["getUser", user], (oldData) => ({
        ...oldData,
        response: { ...oldData?.response, ...data },
      }));
      alert("Update user successfully!!");
    },
    onError: (error) => {
      console.error("Update user failed:", error);
      alert("Update fail successfully. Please try again!");
    },
  });

  return {
    user_paging: userPaging,
    // user_nopaging: userNoPaging,
    createManager: createRoleManager,
    userInfor: getUser.data?.response || {},
    updateUser: updateProfileUser.mutate,
  };
};
export default useUser;

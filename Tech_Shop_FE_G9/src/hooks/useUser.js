import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateProfile } from "../services/userService"; 
import { useSelector } from "react-redux";


const useUser = () => {

    const { user } = useSelector((state) => state.auth);
    const queryClient = useQueryClient();

    const getUser = useQuery({
        queryKey: ["getUser", user], // Dùng user là username làm key của query
        queryFn: () => getUsers(user),
        enabled: !!user, // Chỉ gọi API nếu user có giá trị
    });

    //sử dụng useMuntation để update thông tin user
    const updateProfileUser = useMutation({
        mutationFn: ({userid, formData}) => {updateProfile(userid, formData)}, // Gọi API update user, munationFn nhận vào 1 object có 2 key là userid và formData
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
    })
   
    return {
        userInfor: getUser.data?.response || {},
        updateUser: updateProfileUser.mutate,
    }
}
export default useUser;

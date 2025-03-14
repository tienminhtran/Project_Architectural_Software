import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet  } from "react-router-dom";
import { setUser } from "../../store/slices/AuthSlice";
import { getUsers_Auth } from "../../services/userService";

const ProtectedRoute = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");

  /**
   * Mục đích: Lấy lại thông tin người dùng từ server, sau khi người dùng refresh trang
   */
  useEffect(() => {
   const fetchUser = async () => {
    try {
      const userData = await getUsers_Auth();
      dispatch(setUser(userData));
    } catch (error) {
      console.log(error);
    }
   }
   fetchUser();
  }, [dispatch]);

  if (!accessToken) {
    return <Navigate to="/login" replace/>; // Chưa đăng nhập -> chuyển hướng đến trang đăng nhập
  }

  console.log("ss",roles);

  // Kiểm tra nếu roles chưa được cập nhật -> hiển thị loading
  if (!roles || roles.length === 0) {
    return <div>Loading...</div>;
  }

  //Admin có thể truy cập tất cả
  if(roles[0] === "ROLE_ADMIN") {
    return <Outlet />;
  }

    // Kiểm tra role của người dùng có trong allowedRoles không
  if (!allowedRoles.includes(roles[0])) {
    return <Navigate to="/" replace />; // Không có quyền truy cập -> chuyển hướng về trang chủ
  }

  return <Outlet />; // Cho phép truy cập
};

export default ProtectedRoute;

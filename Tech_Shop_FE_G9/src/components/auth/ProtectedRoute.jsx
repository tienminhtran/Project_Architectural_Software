import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet  } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, roles } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Chưa đăng nhập -> chuyển hướng đến trang đăng nhập
  }


  console.log("ss",roles);

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

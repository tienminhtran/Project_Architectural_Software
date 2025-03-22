import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaTags, FaUsers, FaGift, FaHome, FaUserShield,FaFileInvoice  } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import "/src/assets/css/adminMenu.css"; // Import CSS file
import "/src/assets/css/SubClass.css"; // Import CSS file
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  // State để kiểm soát menu con
  const [openMenus, setOpenMenus] = useState({});

   const { roles } = useSelector((state) => state.auth);
   
  

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Lấy location hiện tại
  const location = useLocation();

  // Lấy trạng thái dashboard trước đó từ localStorage
  const [lastDashboard, setLastDashboard] = useState(() => {
    return localStorage.getItem("lastDashboard") || "admin"; // Mặc định là admin
  });
  const isManagerPage = location.pathname.startsWith("/manager");  // Đang ở Manager
  const isAdminPage = location.pathname.startsWith("/admin");      // Đang ở Admin
  const isCommonPage = location.pathname.startsWith("/common");    // Đang ở trang dùng chung

  // Cập nhật `lastDashboard` ngay khi URL thay đổi
  useEffect(() => {
    if (isAdminPage ) {
      setLastDashboard("admin");
      localStorage.setItem("lastDashboard", "admin");
    } else if (isManagerPage) {
      setLastDashboard("manager");
      localStorage.setItem("lastDashboard", "manager");
    }
  }, [isAdminPage, isManagerPage, lastDashboard]); // Lắng nghe sự thay đổi của URL
  
  console.log(lastDashboard);
  let dashboardLink;

  // Nếu đang ở Admin hoặc trang /common nhưng trạng thái trước đó là Admin
  if (isAdminPage || (isCommonPage && lastDashboard === "admin")) {
    dashboardLink = (
      <li className="menu-item">
        <FaUserShield /> <Link to="/admin/dashboard">Admin Dashboard</Link>
      </li>
    );
  } 
  // Nếu đang ở Manager hoặc trang /common nhưng trạng thái trước đó là Manager
  else if (isManagerPage || (isCommonPage && lastDashboard === "manager")) {
    dashboardLink = (
      <li className="menu-item">
        <FaHome /> <Link to="/manager/dashboard">Manager Dashboard</Link>
      </li>
    );
  }


  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/images/logo/logo-large.png" alt="Site Logo" />
      </div>

      <div className="menuss">
        <ul className="menu">
          {dashboardLink}

            {/* Product */}
            {localStorage.getItem("lastDashboard") === "manager" && (
              <li className={`menu-item ${openMenus.product ? "open" : ""}`} onClick={() => toggleMenu("product")}>
                  <FaTachometerAlt /> Product <IoIosArrowForward className="arrow" />
                  <ul className="submenu">
                    <li><Link to="/common/products">List Products</Link></li>
                    <li><Link to="/common/formProduct">Form Product</Link></li>
                  </ul>
              </li>
            )}

            {/* Order */}
            {localStorage.getItem("lastDashboard") === "manager" && (
              <li className={`menu-item ${openMenus.product ? "open" : ""}`} onClick={() => toggleMenu("order")}>
                  <FaFileInvoice /> Order
                  <ul className="submenu">
                    <li><Link to="/common/orders">List Orders</Link></li>
                  </ul>
              </li>
            )}

            <li className={`menu-item ${openMenus.brand ? "open" : ""}`} onClick={() => toggleMenu("brand")}>
              <FaTags /> Brand <IoIosArrowForward className="arrow" />
              <ul className="submenu">
                  <li><Link to="/common/BrandPage">List Brands</Link></li>
                  <li><Link to="/common/AddBrandPage">Add Brand</Link></li>
              </ul>
            </li>

            <li className={`menu-item ${openMenus.category ? "open" : ""}`} onClick={() => toggleMenu("category")}>
              <BiCategoryAlt /> Category <IoIosArrowForward className="arrow" />
              <ul className="submenu">
                  <li><Link to="/common/CategoryPage">List Category</Link></li>
                  <li><Link to="/common/AddCategoryPage">Add Category</Link></li>

              </ul>
            </li>

            {localStorage.getItem("lastDashboard") === "admin" && (
              <li className={`menu-item ${openMenus.user ? "open" : ""}`} onClick={() => toggleMenu("user")}>
              <FaUsers /> User <IoIosArrowForward className="arrow" />
              <ul className="submenu">
                  <li><Link to="/common/UserPage">List Users</Link></li>
                  <li><Link to="/common/AddUserPage">Add User</Link></li>
              </ul>
            </li>
            )}
            
            <li className={`menu-item ${openMenus.voucher ? "open" : ""}`} onClick={() => toggleMenu("voucher")}>
              <FaGift /> Voucher <IoIosArrowForward className="arrow" />
              <ul className="submenu">
                  <li><Link to="/common/formVoucher">Create Voucher</Link></li>
                  <li><Link to="/common/vouchers">Manage Vouchers</Link></li>
              </ul>
            </li>

            <li className="menu-item">
             <FaHome /> User Home
            </li>

            {localStorage.getItem("lastDashboard") === "admin" && (
              <li className="menu-item">
                <FaHome /> <Link to="/manager/dashboard" className="fw-normal">Manager Home</Link>
              </li>
            )}

            {localStorage.getItem("lastDashboard") === "manager" && roles[1] === "ROLE_MANAGER"&& (
              <li className="menu-item">
                <FaHome /> <Link to="/admin/dashboard" className="fw-normal">Admin Home</Link>
              </li>
            )}
        </ul>
      </div>

    </div>
  );
};

export default Menu;

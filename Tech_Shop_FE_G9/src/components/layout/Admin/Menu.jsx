import React, { useState, useEffect } from "react";
import {
    FaTachometerAlt,
    FaTags,
    FaUsers,
    FaGift,
    FaHome,
    FaUserShield,
    FaFileInvoice,FaRegPaperPlane
} from "react-icons/fa";
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
    const isManagerPage = location.pathname.startsWith("/manager"); // Đang ở Manager
    const isAdminPage = location.pathname.startsWith("/admin"); // Đang ở Admin
    const isCommonPage = location.pathname.startsWith("/common"); // Đang ở trang dùng chung

    // Cập nhật `lastDashboard` ngay khi URL thay đổi
    useEffect(() => {
        if (isAdminPage) {
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
                <FaUserShield />{" "}
                <Link to="/admin/dashboard">Admin Dashboard</Link>
            </li>
        );
    }
    // Nếu đang ở Manager hoặc trang /common nhưng trạng thái trước đó là Manager
    else if (isManagerPage || (isCommonPage && lastDashboard === "manager")) {
        dashboardLink = (
            <li className="menu-item">
                <FaHome />{" "}
                <Link to="/manager/dashboard">Manager Dashboard</Link>
            </li>
        );
    }

    //active submenu
    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    const MenuItem = ({ to, icon, label }) => (
        <li className={`menu-item ${isActive(to) ? "active" : ""}`}>
            {icon} <Link to={to}>{label}</Link>
        </li>
    );

    // tự động mở menu con nếu có đường dẫn khớp với menu
    useEffect(() => {
        if (location.pathname.startsWith("/common/products")) {
            setOpenMenus((prev) => ({ ...prev, product: true }));
        }

        if (location.pathname.startsWith("/common/formProduct")) {
            setOpenMenus((prev) => ({ ...prev, product: true }));
        }

        if (location.pathname.startsWith("/common/orders")) {
            setOpenMenus((prev) => ({ ...prev, order: true }));
        }

        if (location.pathname.startsWith("/common/BrandPage") || location.pathname.startsWith("/common/AddBrandPage")) {
            setOpenMenus((prev) => ({ ...prev, brand: true }));
        }


        if (location.pathname.startsWith("/common/CategoryPage") || location.pathname.startsWith("/common/AddCategoryPage")) {
            setOpenMenus((prev) => ({ ...prev, category: true }));
        }

        if (location.pathname.startsWith("/common/UserPage") || location.pathname.startsWith("/common/AddUserPage")) {
            setOpenMenus((prev) => ({ ...prev, user: true }));
        }

        if (location.pathname.startsWith("/common/formVoucher") || location.pathname.startsWith("/common/vouchers") || location.pathname.startsWith("/common/checkCode")) {
            setOpenMenus((prev) => ({ ...prev, voucher: true }));
        }
        
        // thêm các submenu khác tương tự
    }, [location.pathname]);


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
                        <li
                            className={`menu-item ${
                                openMenus.product ? "open" : ""
                            }`}
                            onClick={() => toggleMenu("product")}
                        >
                            <FaTachometerAlt /> Product{" "}
                            <IoIosArrowForward className="arrow" />
                            <ul className="submenu">
                                <MenuItem to="/common/products" label="List Products" />
                                <MenuItem to="/common/formProduct" label="Form Product" />
                            </ul>
                        </li>
                    )}

                    {/* Order */}
                    {localStorage.getItem("lastDashboard") === "manager" && (
                        <li
                            className={`menu-item ${
                                openMenus.order ? "open" : ""
                            }`}
                            onClick={() => toggleMenu("order")}
                        >
                            <FaFileInvoice /> Order
                            <IoIosArrowForward className="arrow" />
                            <ul className="submenu">
                                <MenuItem to="/common/orders" label="List Orders" />
                            </ul>
                        </li>
                    )}

                    <li
                        className={`menu-item ${openMenus.brand ? "open" : ""}`}
                        onClick={() => toggleMenu("brand")}
                    >
                        <FaTags /> Brand <IoIosArrowForward className="arrow" />
                        <ul className="submenu">
                            <MenuItem to="/common/BrandPage" label="List Brands" />
                            <MenuItem to="/common/AddBrandPage" label="Add Brand" />
                        </ul>
                    </li>

                    <li
                        className={`menu-item ${
                            openMenus.category ? "open" : ""
                        }`}
                        onClick={() => toggleMenu("category")}
                    >
                        <BiCategoryAlt /> Category{" "}
                        <IoIosArrowForward className="arrow" />
                        <ul className="submenu">
                            <MenuItem to="/common/CategoryPage" label="List Category" />
                            <MenuItem to="/common/AddCategoryPage" label="Add Category" />
                        </ul>
                    </li>

                    {localStorage.getItem("lastDashboard") === "admin" && (
                        <li
                            className={`menu-item ${
                                openMenus.user ? "open" : ""
                            }`}
                            onClick={() => toggleMenu("user")}
                        >
                            <FaUsers /> User{" "}
                            <IoIosArrowForward className="arrow" />
                            <ul className="submenu">
                                <MenuItem  to="/common/UserPage" label="List Users" />
                                <MenuItem to="/common/AddUserPage" label="Add User" />
                            </ul>
                        </li>
                    )}

                    <li
                        className={`menu-item ${
                            openMenus.voucher ? "open" : ""
                        }`}
                        onClick={() => toggleMenu("voucher")}
                    >
                        <FaGift /> Voucher{" "}
                        <IoIosArrowForward className="arrow" />
                        <ul className="submenu">
                            {localStorage.getItem("lastDashboard") === "admin" && (
                                <MenuItem to="/common/formVoucher" label="Create Voucher" />
                            )}
                            {localStorage.getItem("lastDashboard") === "manager" && (
                                <MenuItem to="/common/checkCode" label="Create Voucher" />
                            )}
                            <MenuItem to="/common/vouchers" label="Manage Vouchers" />
                        </ul>
                    </li>

                    <li className="menu-item">
                        <FaHome />
                        <Link to="/" className="fw-normal">
                            <span className="text">User Home</span>
                        </Link>
                         {/* User Home */}
                    </li>

                    {localStorage.getItem("lastDashboard") === "admin" && (
                        <li className="menu-item">
                            <FaHome />{" "}
                            <Link to="/manager/dashboard" className="fw-normal">
                                Manager Home
                            </Link>
                        </li>
                    )}
                    {localStorage.getItem("lastDashboard") === "admin" && (
                       <MenuItem to="/admin/code" label="Task" icon={<FaRegPaperPlane />} />
                    )}

                    {localStorage.getItem("lastDashboard") === "manager" &&
                        roles[1] === "ROLE_MANAGER" && (
                            <li className="menu-item">
                                <FaHome />{" "}
                                <Link
                                    to="/admin/dashboard"
                                    className="fw-normal"
                                >
                                    Admin Home
                                </Link>
                            </li>
                        )}
                </ul>
            </div>
        </div>
    );
};

export default Menu;

import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt, FaLock } from "react-icons/fa";
import "/src/assets/css/adminMenuHead.css"; // Import CSS riêng
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/AuthSlice";
import { removeAccessToken } from "../../../services/authService";

import useUser from "../../../hooks/useUser";
import { FaRegUserCircle } from "react-icons/fa";


const Menu_Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
  
    // get user login
    const { userInfor} = useUser();
    
    const [imageName, setImageName] = useState("");
    
    // Toggle menu khi click vào avatar
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    // Xu ly slit file name
    const getFileNameSplit = (fileName) => {
        if (!fileName) return;
        setImageName(fileName.replace(/^[^_]+_[^_]+_/, ""));
    };
    
    React.useEffect(() => {
        if (userInfor?.image) {
            getFileNameSplit(userInfor.image);
        }
    }, [userInfor.image]);
    

    // Ẩn menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Xử lý logout
    const handleLogout = () => {
        dispatch(logout());
        removeAccessToken();
        localStorage.removeItem("lastDashboard");
    };

    return (
        <div className="header">
            {/* Logo */}
            <div className="logo-container">        
            </div>
            

            {/* Avatar + Dropdown Menu */}
            <div className="menu-container" ref={menuRef}>
                {/* <img src='../../../../public/images/avatar/hello.png'alt="User Avatar" className="avatar-hello" /> */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 20px",
                        background: "linear-gradient(135deg,rgb(173, 255, 244),rgb(24, 148, 138))",
                        color: "white",
                        transform: "skew(-10deg)",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        width: "fit-content",
                        margin: "5px auto",
                    }}
                    onClick={toggleMenu}
                    >
                    <div style={{ transform: "skew(10deg)", display: "flex", alignItems: "center", gap: "10px" }}>
                        <FaRegUserCircle size={40} className="user-icon" />
                        <span style={{ fontSize: "18px", whiteSpace: "nowrap" }}>
                        {userInfor.lastname} {userInfor.firstname}
                        </span>
                    </div>
                </div>
                <div className="avatar" onClick={toggleMenu}>
                    <img src={imageName} alt="User Avatar" className="avatar-img" />
                    <span className="status-indicator"></span>
                </div>

                {/* Menu hiển thị khi `isOpen === true` */}
                <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                    <li className="menu-item">
                        <Link to="/common/ProfilePage">
                            <FaUser /> Profile
                        </Link>
                    </li>
                    
                    <li className="menu-item">
                        <Link to="/common/ChangePassword">
                            <FaLock /> Change Password
                        </Link>
                    </li>

                    <li className="menu-item logout">
                        <Link to="/login" role="button" onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                            {/* hiển thị thông báo logout thành công */}
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Menu_Header;

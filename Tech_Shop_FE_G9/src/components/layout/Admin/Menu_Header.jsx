import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaUser, FaSignOutAlt, FaLock } from "react-icons/fa";
import "/src/assets/css/adminMenuHead.css"; // Import CSS riêng
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsers } from "../../../services/userService";

const Menu_Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    
    const { user } = useSelector((state) => state.auth);
    const [userLogin, setUserLogin] = useState({});

    // Toggle menu khi click vào avatar
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

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

    const fetchUsers = useCallback(async () => {
        console.log(user);
        if(!user) return;

        try {
            const response = await getUsers(user); // Chắc chắn user có id
            setUserLogin(response.response);
            console.log(response);
        } catch (error) {
            console.log("Failed to fetch users: ", error);
        }
    }, [user]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    return (
        <div className="header">
            {/* Logo */}
            <div className="logo-container">
                {/* <img src="/images/logo/logo-large.png" alt="Site Logo" className="logo" /> */}
                <h3 className="title">Admin Dashboard</h3>            
            </div>

            {/* Avatar + Dropdown Menu */}
            <div className="menu-container" ref={menuRef}>
                <span className="username">{userLogin.lastname} {userLogin.firstname}</span>
        
                <div className="avatar" onClick={toggleMenu}>
                    <img src="/images/avatar/avtdefault.jpg" alt="User Avatar" className="avatar-img" />
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
                        <Link to="/login">
                            <FaSignOutAlt /> Logout
                        </Link>
                    </li>


                    {/* <li className="menu-item"><FaUser /> Profile</li> */}
                    {/* <li className="menu-item"><FaLock /> Change Password</li> */}
                    {/* <li className="menu-item logout"><FaSignOutAlt /> Logout</li> */}

                </ul>
            </div>
        </div>
    );
};

export default Menu_Header;

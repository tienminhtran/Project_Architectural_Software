import React from "react";
import HeardUserBasic from "../../components/layout/HeaderUserBasic"; // Adjust the path as necessary
import FooterUser from "../../components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../assets/css/HomePage.css";
import CartBuyOrderBox from "./CartBuyOrderBox";
const HomeCart = () => {
    return (
        <div>
            <HeardUserBasic />
            <CartBuyOrderBox />
            <FooterUser />
        </div>
    );
};

export default HomeCart;

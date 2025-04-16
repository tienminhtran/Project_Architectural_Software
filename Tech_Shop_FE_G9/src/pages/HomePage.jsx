import React from "react";
import FooterUser from "../components/layout/Footer"; // Adjust the path as necessary
import HeardUser from "../components/layout/HeaderUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/css/HomePage.css";
import ProductUserLapTop from "../components/layout/ProductUserLapTop"; 
import ProductsYouViewed from "../components/layout/ProductsYouViewed"; 
import Brand from "../components/layout/Brand";
import ProductUserPhone from "../components/layout/ProductUserPhone";
import ProductUserAccessory from "../components/layout/ProductUserAccessory"
const HomePage = () => {
    return (
        <div>
            <HeardUser />
            <ProductsYouViewed />
            <ProductUserLapTop />
            <ProductUserPhone/>
            <ProductUserAccessory/>
            <Brand />
            <FooterUser />
        </div>
    );
};

export default HomePage;

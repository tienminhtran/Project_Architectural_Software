import React from "react";
import FooterUser from "../../../components/layout/Footer"; // Adjust the path as necessary
import HeardUser from "../../../components/layout/HeaderUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "../assets/css/HomePage.css";
// import ProductUser from "../components/layout/ProductUser"; 
import ProductsYouViewed from "../../../components/layout/ProductsYouViewed"; 
import Brand from "../../../components/layout/Brand";
import FindProduct from "./FindProduct";
//phone
import ProductCategoriesPhone from "./Phone/ProductCategoriesPhone";
const ProductCategories = () => {
    return (
        <div>
            <h1>PHONE</h1>
            <HeardUser />
            <FindProduct />
            <ProductCategoriesPhone/>
            <ProductsYouViewed />
            <Brand />
            <FooterUser />
        </div>
    );
};

export default ProductCategories;

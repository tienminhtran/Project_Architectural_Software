import React, {useMemo} from "react";
import HeardUserBasic from "../../components/layout/HeaderUserBasic"; // Adjust the path as necessary
import FooterUser from "../../components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../assets/css/HomePage.css";
import CartBuyOrderBox from "./CartBuyOrderBox";
import useCart from "../../hooks/useCart";
import Loading from "../../components/common/Loading";
const HomeCart = () => {
    const { carts, isLoading } = useCart();
    console.log("carts", carts);

    const cartItems = useMemo(() => {
        if(!carts) return [];
        return carts.response;
    }, [carts]); 
    console.log("cartItems", cartItems);

    return (
        <div>
            <HeardUserBasic />
            <CartBuyOrderBox cartItems={cartItems} />
           
            <FooterUser />
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default HomeCart;

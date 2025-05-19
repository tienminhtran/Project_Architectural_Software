import React, {useEffect, useState} from "react";
import FooterUser from "../Footer"; // Adjust the path as necessary
import HeardUser from "../HeaderUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "../assets/css/HomePage.css";
// import ProductUser from "../components/layout/ProductUser"; 
import ProductsYouViewed from "../ProductsYouViewed"; 
import Brand from "../Brand";
import FindProduct from "./FindProduct";
import { filterProductByCategory } from "../../../services/productService";
import Loading from "../../common/Loading";
import { useLocation } from "react-router-dom";
//phone
import ProductCategories from "./Phone/ProductCategories";
import useProduct from "../../../hooks/useProduct";
const ProductCategory = () => {
    const location = useLocation();
    const { categoryId } = location.state || { categoryId: null };
    console.log("categoryId", categoryId);

    const { filterProduct, filterProductData } = useProduct(0 ,10);

    const [products, setProducts] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    console.log("products", products);

    useEffect(() => {
        if(categoryId) {
            const fetchProducts = async() => {
                setIsLoading(true);
                try {
                    const response = await filterProductByCategory(categoryId);
                    setProductsCategory(response.response);           
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProducts();
        }
    }, [categoryId]);
    useEffect(() => {
        if(categoryId) {
            const fetchProducts = async() => {
                setIsLoading(true);
                try {
                    const filterRequest = {
                        categoryId: categoryId,
                    };
                    await filterProduct({filterRequest});            
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProducts();
        }
    }, [categoryId]);

    useEffect(() => {
        
        setProducts(filterProductData);
        
    }, [filterProductData]);

    return (
        <div>
            <HeardUser showCategory={true} showBanner={true} currentTab={"Home"} currentCategory={categoryId}/>
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <>
                    <FindProduct categoryId={categoryId} filterProduct={filterProduct} productsCategory={productsCategory} />
                    <ProductCategories products={products} />
                    <ProductsYouViewed />
                    <Brand />
                </>
            )}
            <FooterUser />
        </div>
    );
};

export default ProductCategory;

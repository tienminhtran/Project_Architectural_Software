import React, {useEffect} from "react";
import FooterUser from "../components/layout/Footer"; // Adjust the path as necessary
import HeardUser from "../components/layout/HeaderUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/css/HomePage.css";
import ProductUserLapTop from "../components/layout/ProductUserLapTop"; 
import ProductsYouViewed from "../components/layout/ProductsYouViewed"; 
import Brand from "../components/layout/Brand";
import ProductCarousel from "../components/layout/Product-Carousel";
import ProductUserAccessory from "../components/layout/ProductUserAccessory"
import { filterProductPhone, filterProductLaptop } from "../services/productService"; // Adjust the path as necessary
const HomePage = () => {

    const brandsPhone = [ "Apple", "Samsung", "Xiaomi", "OPPO", "Vivo", "Realme", "Nokia"];

    const brandsLapTop = ["ASUS", "ACER", "MSI", "LENOVO", "GIGABYTE", "DELL"];

    const [productsPhone, setProductsPhone] = React.useState([]);
    const [productslaptop, setProductsLapTop] = React.useState([]);
    console.log("products phone", productsPhone);
    console.log("products laptop", productslaptop);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await filterProductPhone();
          console.log("products", response);
          setProductsPhone(response.response); // Giả sử response chứa danh sách sản phẩm
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }, []);

    useEffect(() => {
        const fetchProducts=  async () => {
            try {
        
                const response = await filterProductLaptop();
                console.log("products laptop", response);
                setProductsLapTop(response.response);
            } catch (error) {
                console.error("Error fetching products:", error);
                
            }
        }
        fetchProducts();
    },[])
    return (
        <div>
            <HeardUser showCategory={true} showBanner={true} />
            <ProductsYouViewed />
            <ProductCarousel products={productslaptop} brands={brandsLapTop} name={"Laptop"} />
            <ProductCarousel products={productsPhone} brands={brandsPhone} name={"Phone"}/>
            <ProductUserAccessory/>
            <Brand />
            <FooterUser />
        </div>
    );
};

export default HomePage;

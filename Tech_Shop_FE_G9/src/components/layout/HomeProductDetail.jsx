import React, {useEffect} from 'react';
import HeaderUserBasic  from './HeaderUserBasic';
import ProductDetail from './ProductDetail';
import ProductsYouViewed from './ProductsYouViewed';
import ProductUserPhone from './ProductUserPhone';
import ProductInformation from './ProductInformation';
import Footer from './Footer';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getProductId } from '../../services/productService';
import Loading from '../common/Loading';
const HomeProductDetail = () => {
  const { id } = useParams(); // lấy id từ URL
  const location = useLocation(); // lấy location từ react-router-dom


  const [product, setProduct] = React.useState(location.state?.product || null); 
  const [isLoading, setIsLoading] = React.useState(!location.state?.product); 

  
  useEffect(() => {
    if(!product) {
      const fetchProduct = async () => {
        try {
          const decodedId = atob(id); // Giải mã id từ Base64 

          const response = await getProductId(decodedId);

          setProduct(response.response); 
          setIsLoading(false); 

        } catch (error) {
          console.error("Error fetching product:", error);
          setIsLoading(false);
        }
      };
      fetchProduct();
    }

  }, [id, product]); // gọi hàm khi component được mount hoặc id thay đổi
  

  return (
    <div>
        <HeaderUserBasic />
        <ProductDetail product={product} />
        Sản phẩm tương tự
        <ProductUserPhone />
        <ProductInformation product={product} />
        <ProductsYouViewed />
        <Footer />
        {/* <div className="container-fluid py-3">
            <div className="row">
            <div className="col-12 text-center">
                <h1>Product Detail</h1>
            </div>
            </div>
        </div> */}

        <Loading isLoading={isLoading} /> 
    </div>
    

  );
};

export default HomeProductDetail;

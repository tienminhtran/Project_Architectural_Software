import React, {useEffect, useState} from 'react';
import HeaderUserBasic  from './HeaderUserBasic';
import ProductDetail from './ProductDetail';
import ProductsYouViewed from './ProductsYouViewed';
import ProductCarousel from './Product-Carousel';
import ProductInformation from './ProductInformation';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { getProductId, filterProductLaptop, filterProductPhone } from '../../services/productService';
import Loading from '../common/Loading';
const HomeProductDetail = () => {
  const { id } = useParams(); // lấy id từ URL

  console.log("location"); // kiểm tra xem location có chứa state không

  const [product, setProduct] = useState(null); 
  const [productSimilar, setProductSimilar] = useState([]); // sản phẩm tương tự
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log('useEffect is running with id:', id);

    const fetchProduct = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const decodedId = atob(id); // Giải mã id từ Base64
        const response = await getProductId(decodedId);
        console.log('API response:', response);

        if (!response?.response?.category?.name) {
          throw new Error('Invalid product data');
        }

        const category = response.response.category.name;
        let similarProducts = [];
        if (category === 'Computer') {
          const responseSimilar = await filterProductLaptop();
          similarProducts = responseSimilar.response || [];
        } else if (category === 'Phone') {
          const responseSimilar = await filterProductPhone();
          similarProducts = responseSimilar.response || [];
        }

        setProduct(response.response);
        setProductSimilar(similarProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  

  return (
    <div>
        <HeaderUserBasic />
        
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            <ProductDetail product={product} />
            <ProductCarousel products={productSimilar} name="Similar Products "/>
            <ProductInformation product={product} />
            <ProductsYouViewed />
            <Footer />
          </>
          
        )}
      
    </div>
    

  );
};

export default HomeProductDetail;

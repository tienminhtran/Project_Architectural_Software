import React from 'react';
import HeaderUserBasic  from './HeaderUserBasic';
import ProductDetail from './ProductDetail';
import ProductsYouViewed from './ProductsYouViewed';
import ProductUserPhone from './ProductUserPhone';
import ProductInformation from './ProductInformation';
import Footer from './Footer';
const HomeProductDetail = () => {
  return (
    <div>
        <HeaderUserBasic />
        <ProductDetail />
        Sản phẩm tương tự
        <ProductUserPhone />
        <ProductInformation />
        <ProductsYouViewed />
        <Footer />
        {/* <div className="container-fluid py-3">
            <div className="row">
            <div className="col-12 text-center">
                <h1>Product Detail</h1>
            </div>
            </div>
        </div> */}
    </div>
    

  );
};

export default HomeProductDetail;

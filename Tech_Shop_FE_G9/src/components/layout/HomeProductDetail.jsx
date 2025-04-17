import React from 'react';
import HeaderUserBasic  from './HeaderUserBasic';
import ProductDetail from './ProductDetail';
import ProductsYouViewed from './ProductsYouViewed';

const HomeProductDetail = () => {
  return (
    <div>
        <HeaderUserBasic />
        <ProductDetail />
        <ProductsYouViewed />
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

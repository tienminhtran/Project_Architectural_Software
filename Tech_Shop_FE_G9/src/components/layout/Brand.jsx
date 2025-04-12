import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaTags } from "react-icons/fa";
import "../../assets/css/Brand.css";
import { Link } from "react-router-dom";
import useBrandData from "../../hooks/useBrandData";

const Brand = () => {
    const { brandAll } = useBrandData();

    // Dữ liệu brand lấy từ API
    const brands = brandAll?.data?.response || [];

    return (
        <div className="brand-section">
            <div>
                <h2>
                    <FaTags className="brand-icon" /> Brands
                </h2>
                <h1>Browse by Brands</h1>
            </div>
            <div className="brand-sliders">
                <Swiper spaceBetween={20} slidesPerView={5} navigation={true} pagination={true}>
                    {brands.map((brand, index) => (
                        <SwiperSlide key={index}>
                            <div className="brand-card">
                                <img src={brand.brandImg} alt={brand.name} />
                                <p>{brand.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Brand;

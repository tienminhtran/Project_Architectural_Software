package vn.edu.iuh.fit.services.impl;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:50 AM
 * @nameProject: Project_Architectural_Software
 */

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.BrandRequest;
import vn.edu.iuh.fit.dtos.request.VoucherRequest;
import vn.edu.iuh.fit.dtos.response.BrandResponse;
import vn.edu.iuh.fit.dtos.response.CategoryResponse;
import vn.edu.iuh.fit.dtos.response.VoucherResponse;
import vn.edu.iuh.fit.entities.Brand;
import vn.edu.iuh.fit.entities.Category;
import vn.edu.iuh.fit.entities.Voucher;
import vn.edu.iuh.fit.repositories.BrandRepository;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.services.BrandService;

import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    BrandRepository brandRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;


    private BrandResponse convertToDto(Brand brand) {
        return modelMapper.map(brand, BrandResponse.class);
    }

    private Brand convertToEntity(BrandRequest brandRequest) {
        return modelMapper.map(brandRequest, Brand.class);
    }


    /**
     * Find brand by id
     * @param aLong
     * @return  brand by id
     */
    @Override
    public Optional<BrandResponse> findById(Long aLong) {
        Optional<Brand> brand = brandRepository.findBrandById(aLong);
        if (brand.isPresent()) {
            return Optional.of(modelMapper.map(brand.get(), BrandResponse.class));
        }
        return Optional.empty();
    }


}

package vn.edu.iuh.fit.services.impl;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:50 AM
 * @nameProject: Project_Architectural_Software
 */

import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.BrandRequest;
import vn.edu.iuh.fit.dtos.response.BrandResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.entities.Brand;
import vn.edu.iuh.fit.repositories.BrandRepository;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.services.BrandService;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

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

    // Kiểm tra hình ảnh có phải là hình ảnh hợp lệ không (có phải là hình ảnh có đuôi mở rộng là .jpg, .png, .jpeg, .gif, .bmp không)
    private boolean isValidSuffixImage(String img) {
        return img.endsWith(".jpg") || img.endsWith(".png") || img.endsWith(".jpeg")
                || img.endsWith(".gif") || img.endsWith(".bmp");

    }


    @Override
    public List<BrandResponse> getAllBrands() {
        List<Brand> brands = brandRepository.findAll();
        if (brands != null) {
            return brands.stream().map(this::convertToDto).toList();
        }
        return null;
    }

    @Override
    public Optional<BrandResponse> findById(Long id) {
        Optional<Brand> brand = brandRepository.findBrandById(id);
        return brand.map(this::convertToDto);
    }

    @Override
    public PageResponse<BrandResponse> getBrandsByPage(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Brand> brands = brandRepository.findAll(pageable);
        PageResponse<BrandResponse> pageDto = new PageResponse<>();
        if (brands != null) {
            pageDto.setPage(pageNo);
            pageDto.setSize(pageSize);
            pageDto.setTotal(brands.getNumberOfElements());
            pageDto.setTotalPages(brands.getTotalPages());
            pageDto.setValues(brands.stream().map(this::convertToDto).toList());
        }
        return pageDto;
    }

    @Override
    public BrandResponse save(BrandRequest brandRequest) {
        Brand brandEntity = this.convertToEntity(brandRequest);
        Brand brand = brandRepository.save(brandEntity);
        if (brand != null) {
            return this.convertToDto(brand);
        }
        return null;
    }

    @Override
    public BrandResponse update(BrandRequest brandRequest, Long id) {
        Optional<Brand> brand = brandRepository.findById(id);
        if (brand.isPresent()) {
            Brand brandEntity = this.convertToEntity(brandRequest);
            brandEntity.setId(id);
            Brand brandUpdated = brandRepository.save(brandEntity);
            if (brandUpdated != null) {
                return this.convertToDto(brandUpdated);
            }
        }
        return null;
    }

    @Override
    public boolean delete(Long id) {
        Optional<Brand> brand = brandRepository.findById(id);
        if (brand.isPresent()) {
            brand.get().setActive(false);
            brandRepository.save(brand.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean existsBrand(String name) {
        Optional<Brand> brand = brandRepository.findByName(name);
        if (brand.isPresent()) {
            return true;
        }
        return false;
    }


}

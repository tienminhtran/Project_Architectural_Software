/**
 * @ (#) ProductServiceImpl.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.services.ProductService;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    //entity to dto
    // Phương thức chuyển đổi User sang DTO với kiểu generic T
    private <T> T convertToDto(Product product, Class<T> targetClass) {
        return modelMapper.map(product, targetClass);
    }

    // Phương thức chuyển đổi DTO sang User với kiểu generic T
    private <T> Product convertToEntity(T tDto, Class<T> dtoClass) {
        return modelMapper.map(tDto, Product.class);
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> this.convertToDto(product, ProductResponse.class)).toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return this.convertToDto(product, ProductResponse.class);
    }

    @Override
    public PageResponse<ProductResponse> getProductsByPage(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Product> products = productRepository.findAll(pageable);
        PageResponse<ProductResponse> pageDto = new PageResponse<>();
        if (products != null) {
            pageDto.setPage(pageNo);
            pageDto.setSize(pageSize);
            pageDto.setTotal(products.getNumberOfElements());
            pageDto.setTotalPages(products.getTotalPages());
            pageDto.setValues(products.stream().map(product -> this.convertToDto(product, ProductResponse.class)).toList());
        }
        return pageDto;
    }
}

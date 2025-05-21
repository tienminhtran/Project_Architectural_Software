/**
 * @ (#) ProductRecommendationServiceImpl.java      5/21/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.ProductRecommendationResponse;
import vn.edu.iuh.fit.entities.ProductRecommendation;
import vn.edu.iuh.fit.repositories.ProductRecommendationRepository;
import vn.edu.iuh.fit.services.ProductRecommendationService;

import java.util.List;

/*
 * @description:
 * @author: Tien Minh Tran
 * @date: 5/21/2025
 */
@Service
public class ProductRecommendationServiceImpl implements ProductRecommendationService {

    @Autowired
    ProductRecommendationRepository productRecommendationRepository;


    @Autowired
    private ModelMapper modelMapper;



    private  ProductRecommendationResponse convertToDto(ProductRecommendation productRecommendation) {
        return modelMapper.map(productRecommendation, ProductRecommendationResponse.class);
    }

    private ProductRecommendation convertToEntity(ProductRecommendationResponse productRecommendationResponse) {
        return new ProductRecommendation(productRecommendationResponse.getId(), productRecommendationResponse.getName(), productRecommendationResponse.getCategory(), productRecommendationResponse.getPrice(), productRecommendationResponse.getImage());
    }

    @Override
    public List<ProductRecommendationResponse> getAllProducts() {
        List<ProductRecommendation> productRecommendations = productRecommendationRepository.findAll();
        return productRecommendations.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public List<ProductRecommendationResponse> getProductsByCategory(String category) {
        return List.of();
    }
}
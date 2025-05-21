/**
 * @ (#) ProductRecommendationService.java      5/21/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.response.ProductRecommendationResponse;

import java.util.List;

/*
 * @description:
 * @author: Tien Minh Tran
 * @date: 5/21/2025
 */
public interface ProductRecommendationService {
    List<ProductRecommendationResponse> getAllProducts();

    // Lay danh sach produce recommendation theo category
    List<ProductRecommendationResponse> getProductsByCategory(String category);
}
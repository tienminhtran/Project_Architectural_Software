/**
 * @ (#) ProductService.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */

import jakarta.validation.Valid;
import vn.edu.iuh.fit.dtos.request.ProductRequest;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(Long id);

    PageResponse<ProductResponse> getProductsByPage(int pageNo, int pageSize);

    public ProductResponse createProduct(ProductRequest productRequest);
    boolean existsProduct(String name);

    int countProducts();

    int getTotalStockQuantity();
}

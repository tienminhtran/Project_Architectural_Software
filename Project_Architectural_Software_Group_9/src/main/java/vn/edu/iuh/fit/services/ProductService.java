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
import vn.edu.iuh.fit.dtos.request.ProductFilterRequest;
import vn.edu.iuh.fit.dtos.request.ProductRequest;
import vn.edu.iuh.fit.dtos.response.BestSellingProductResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    PageResponse<ProductResponse> getProductsByPage(int pageNo, int pageSize);

    public ProductResponse createProduct(ProductRequest productRequest);

    public ProductResponse updateProduct(Long id, ProductRequest productRequest);

    boolean existsProduct(String name);


    int getTotalStockQuantity();

    List<BestSellingProductResponse> getBestSellingProducts(LocalDate startDate, LocalDate endDate);

    List<ProductResponse> getRecentProducts();

    Double calculateTotalRevenue();

    int countProducts();
    /*
        search product by productName, battery, cpu, description, graphicCard,monitor,os,port, price, ram,stockQuantity,warranty,weight

     */
    PageResponse<ProductResponse> searchProduct(String keyword, int pageNo, int pageSize);

    boolean deleteProduct(Long id);

    List<ProductResponse> filterProductLaptop();
    public List<ProductResponse> filterProductPhone();

    public List<ProductResponse> filterProductTablet();

    public List<ProductResponse> filterProductByCategory(Long id);

    public List<ProductResponse> getFilteredProducts(ProductFilterRequest filterRequest);


}

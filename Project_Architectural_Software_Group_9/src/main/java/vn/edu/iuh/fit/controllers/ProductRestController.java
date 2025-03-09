/**
 * @ (#) ProductRestController.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.ProductRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.BestSellingProductResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;
import vn.edu.iuh.fit.services.ProductService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@RestController
@RequestMapping("/api/v1/products")
public class ProductRestController {
    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<BaseResponse<?>> getAllProductsByPage(@RequestParam(defaultValue = "0", required = false) Integer pageNo,
                                                                @RequestParam(defaultValue = "10", required = false) Integer pageSize) {

        if(pageNo == null) {
            pageNo = 0;
        }

        if(pageSize == null) {
            pageSize = 8;
        }

        PageResponse<ProductResponse> productResponses = productService.getProductsByPage(pageNo, pageSize);

        if(productResponses == null || productResponses.getValues().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all products").response(productResponses).build());

    }

    @GetMapping("/all")
    public ResponseEntity<BaseResponse<?>> getAllProducts() {
        List<ProductResponse> productResponses = productService.getAllProducts();

        if(productResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all products").response(productResponses).build());

    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> getProductById(@PathVariable Long id) {
        ProductResponse productResponse = productService.getProductById(id);

        if(productResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get product by id").response(productResponse).build());
    }

    @GetMapping("/recent")
    public ResponseEntity<BaseResponse<?>> getRecentProducts() {
        List<ProductResponse> productResponses = productService.getRecentProducts();
        if (productResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get recent products").response(productResponses).build());
    }

    @GetMapping("/revenue")
    public ResponseEntity<BaseResponse<?>> getTotalRevenue() {
        Double totalRevenue = productService.calculateTotalRevenue();
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get total revenue").response(totalRevenue).build());
    }


    /**
     * test api trong postman
     * phan header: Content-Type: multipart/form-data
     * phan body: form-data (thay vi chon raw thi chon form-data)
     * chon key 1 la product, value la text(nhap theo dinh dang json) cua product
     * chon key 2 la fileImage, value la file (chon file anh)
     * @param productJson
     * @param fileImages
     * @return
     */
    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<?>> createProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "fileImage", required = false) List<MultipartFile> fileImages) {

        // Chuyen string sang json
        ObjectMapper objectMapper = new ObjectMapper();
        ProductRequest productRequest;
        try {
            productRequest = objectMapper.readValue(productJson, ProductRequest.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON format: " + e.getMessage());
        }

        productRequest.setFileImage(fileImages);
        ProductResponse newProduct = productService.createProduct(productRequest);
        if (newProduct == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Create product success")
                .response(newProduct)
                .build());
    }


//    /**
//     * Dunng RequestBody de lay du lieu tu body cua request
//     * Chi dung duoc khi khong add file
//     * @param id
//     * @param productRequest
//     * @return
//     */
//    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
//    @PutMapping("/{id}")
//    public ResponseEntity<BaseResponse<?>> updateProduct(
//            @PathVariable Long id,
//            @Valid @RequestBody ProductRequest productRequest) {
//
//        ProductResponse updatedProduct = productService.updateProduct(id, productRequest);
//        if (updatedProduct == null) {
//            return ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok(BaseResponse.builder()
//                .status("SUCCESS")
//                .message("Product updated successfully")
//                .response(updatedProduct)
//                .build());
//    }


    /**
     * test api trong postman
     * phan header: Content-Type: multipart/form-data
     * phan body: form-data (thay vi chon raw thi chon form-data)
     * chon key 1 la product, value la text(nhap theo dinh dang json) cua product
     * chon key 2 la fileImage, value la file (chon file anh)
     * @param productJson
     * @param fileImages
     * @return
     */
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<?>> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") String productJson,
            @RequestPart(value = "fileImage", required = false) List<MultipartFile> fileImages) {

        // Chuyen string sang json
        ObjectMapper objectMapper = new ObjectMapper();
        ProductRequest productRequest;
        try {
            productRequest = objectMapper.readValue(productJson, ProductRequest.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON format: " + e.getMessage());
        }

        productRequest.setFileImage(fileImages);
        ProductResponse newProduct = productService.updateProduct(id,productRequest);

        if (newProduct == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Create product success")
                .response(newProduct)
                .build());
    }


    @GetMapping("/count")
    public ResponseEntity<BaseResponse<?>> countProducts() {
        int count = productService.countProducts();
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Count products").response(count).build());
    }

    @GetMapping("/countStock")
    public ResponseEntity<BaseResponse<?>> getTotalStockQuantity() {
        int count = productService.getTotalStockQuantity();
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Total stock quantity").response(count).build());
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping("/bestSelling")
    public ResponseEntity<BaseResponse<?>> getBestSellingProducts(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false)LocalDate endDate) {

        int currentYear = LocalDate.now().getYear();
        if (startDate == null) {
            startDate = LocalDate.of(currentYear, 1, 1);
        }

        if (endDate == null) {
            endDate = LocalDate.of(currentYear, 12, 31);
        }

        List<BestSellingProductResponse> bestSellingProductResponses = productService.getBestSellingProducts(startDate, endDate);
        if (bestSellingProductResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get best selling products").response(bestSellingProductResponses).build());
    }
}

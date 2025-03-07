/**
 * @ (#) ProductRestController.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.ProductRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;
import vn.edu.iuh.fit.services.ProductService;

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

        if (pageNo == null) {
            pageNo = 0;
        }

        if (pageSize == null) {
            pageSize = 8;
        }

        PageResponse<ProductResponse> productResponses = productService.getProductsByPage(pageNo, pageSize);

        if (productResponses == null || productResponses.getValues().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all products").response(productResponses).build());

    }

    @GetMapping("/all")
    public ResponseEntity<BaseResponse<?>> getAllProducts() {
        List<ProductResponse> productResponses = productService.getAllProducts();

        if (productResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all products").response(productResponses).build());

    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> getProductById(@PathVariable Long id) {
        ProductResponse productResponse = productService.getProductById(id);

        if (productResponse == null) {
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
        Double totalRevenue = productService.getTotalRevenue();
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get total revenue").response(totalRevenue).build());
    }


    /**
     * Create a new product
     * @param productRequest
     * @return ResponseEntity<BaseResponse < ?>> response
     */

    /*
    Test:
       			"createdAt": "2024-11-01T00:00:00",
            "updatedAt": "2025-02-23T00:00:00",
            "id": 2,
            "battery": "5000mAh",
            "cpu": "Intel i5",
            "description": "AAAAAAAAAAAAAAAA",
            "frontCamera": "N/A",
            "graphicCard": "NVIDIA GTX 1650",
            "monitor": "14 inch",
            "productName": "HP ProBook",
            "os": "Windows 10",
            "port": "USB 3.0, HDMI",
            "price": 12000000.00,
            "ram": "8GB",
            "rearCamera": "N/A",
            "stockQuantity": 28,
            "thumbnail": "https://giaiphapvanphong.vn/Image/Picture/HP/Laptop/6M0Y8PA.png",
            "warranty": "1 year",
            "weight": 2.0,
            "images": [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH7baYASYe45fx_REeGP4NY9nnjO0LfCAHhQ&s",
                "https://bizweb.dktcdn.net/thumb/1024x1024/100/446/400/products/hp-probook-650-g7-0-gia-loc.jpg?v=1703217442140"
            ]

        }
     */

}

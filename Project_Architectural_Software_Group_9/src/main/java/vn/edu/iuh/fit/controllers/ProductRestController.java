/**
 * @ (#) ProductRestController.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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




}

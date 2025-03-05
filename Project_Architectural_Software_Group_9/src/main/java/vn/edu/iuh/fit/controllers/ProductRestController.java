/**
 * @ (#) ProductRestController.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.ProductRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;
import vn.edu.iuh.fit.services.ProductService;

import java.io.IOException;
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


//    @PostMapping("")
//    public ResponseEntity<BaseResponse<?>> createProduct(@Valid @RequestBody ProductRequest productResponse) {
//       if(productService.existsProduct(productResponse.getName())){
//           return ResponseEntity.status(400)
//                   .body(BaseResponse.builder().status("FAILED").message("The product already exists! ").build());
//       }
//
//        ProductResponse newProduct = productService.save(productResponse);
//        if (newProduct == null ) {
//            return ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Create product success").response(newProduct).build());
//    }


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

}

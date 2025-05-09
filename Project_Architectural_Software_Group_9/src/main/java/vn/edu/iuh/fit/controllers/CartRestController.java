/**
 * @ (#) CartRestController.java      3/20/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.CartItemRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.CartItemResponse;
import vn.edu.iuh.fit.dtos.response.CartResponse;
import vn.edu.iuh.fit.exception.CustomJwtException;
import vn.edu.iuh.fit.services.CartItemService;
import vn.edu.iuh.fit.services.CartService;

import java.util.List;
import java.util.Map;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/20/2025
 */
@RestController
@RequestMapping("/api/v1/cart")
public class CartRestController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/me")
    public ResponseEntity<BaseResponse<?>> getCartOfMe(@RequestHeader("Authorization") String token) {
        CartResponse cartResponse = cartService.getCartByUserId(token);

        if (cartResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get cart item by user success").response(cartResponse).build());

    }

    @GetMapping("/me/items")
    public ResponseEntity<BaseResponse<?>> getCartItemOfMe(@RequestHeader("Authorization") String token) {
        List<?> cartResponse = cartItemService.getCartItemsByCartId(token);
        if (cartResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get cart item by user success").response(cartResponse).build());

    }

    @PostMapping("/add")
    public ResponseEntity<BaseResponse<?>> addProductToCart(@RequestHeader("Authorization") String token, @RequestBody CartItemRequest request) {
        try {
            CartItemResponse cartItemResponse = cartItemService.addProductToCart(token, request);
            return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Add product to cart success").response(cartItemResponse).build());
        } catch (CustomJwtException e) {
            return ResponseEntity.badRequest().body(BaseResponse.builder().status("FAIL").message(e.getMessage()).build());
        }
    }

    @DeleteMapping("/{id_product}/delete")
    public ResponseEntity<BaseResponse<?>> deleteProductToCart(@RequestHeader("Authorization") String token, @PathVariable Long id_product) {
        if (id_product == null) {
            return ResponseEntity.badRequest().body(BaseResponse.builder().status("FAIL").message("Delete product to cart failed").build());
        }

        boolean isDeleted = cartItemService.deleteCartItem(id_product, token);
        if (isDeleted) {
            return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Delete product to cart success").build());
        } else {
            return ResponseEntity.badRequest().body(BaseResponse.builder().status("FAIL").message("Delete product to cart failed").build());
        }

    }

    @PutMapping("/{id_product}/update")
    public ResponseEntity<BaseResponse<?>> updateQuantity(@RequestHeader("Authorization") String token,
                                                          @PathVariable Long id_product,
                                                          @RequestBody Map<String, Integer> request) {
        if (id_product == null || request.get("quantity") == null) {
            return ResponseEntity.badRequest().body(BaseResponse.builder().status("FAIL").message("Update product to cart failed").build());
        }
        int quantity = request.get("quantity");
        CartItemResponse cartItemResponse = cartItemService.updateQuantity(id_product, token, quantity);
        if (cartItemResponse != null) {
            return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Update product to cart success").response(cartItemResponse).build());
        } else {
            return ResponseEntity.badRequest().body(BaseResponse.builder().status("FAIL").message("Update product to cart failed").build());
        }
    }
}

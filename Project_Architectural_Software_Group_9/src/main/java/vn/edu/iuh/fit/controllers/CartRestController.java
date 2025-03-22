/**
 * @ (#) CartRestController.java      3/20/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.CartResponse;
import vn.edu.iuh.fit.services.CartService;

import java.util.List;

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

    @GetMapping("/me/{userId}")
    public ResponseEntity<BaseResponse<?>> getCartOfMe(@PathVariable Long userId){
        CartResponse cartResponse = cartService.getCartByUserId(userId);

        if (cartResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get cart item by user success").response(cartResponse).build());

    }

    @GetMapping("/me/{userId}/items")
    public ResponseEntity<BaseResponse<?>> getCartItemOfMe(@PathVariable Long userId){
        List<?> cartResponse = cartService.getCartItemsByCartId(userId);
        if (cartResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get cart item by user success").response(cartResponse).build());

    }
}

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
    public ResponseEntity<BaseResponse<?>> getCartOfMe(@RequestHeader("Authorization") String token){
        CartResponse cartResponse = cartService.getCartByUserId(token);

        if (cartResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get cart item by user success").response(cartResponse).build());

    }

    @GetMapping("/me/items")
    public ResponseEntity<BaseResponse<?>> getCartItemOfMe(@RequestHeader("Authorization") String token){
        List<?> cartResponse = cartItemService.getCartItemsByCartId(token);
        if (cartResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get cart item by user success").response(cartResponse).build());

    }


}

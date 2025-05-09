/**
 * @ (#) CartItemService.java      4/21/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.request.CartItemRequest;
import vn.edu.iuh.fit.dtos.response.CartItemResponse;
import vn.edu.iuh.fit.exception.CustomJwtException;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/21/2025
 */
public interface CartItemService {

    public List<CartItemResponse> getCartItemsByCartId(String token);

    /**
     * @description: Add product to cart
     * @param token
     * @param request
     * @return CartItemResponse
     */
    CartItemResponse addProductToCart(String token, CartItemRequest request) throws CustomJwtException;

    boolean deleteCartItem(Long idCartItem, String token);


}

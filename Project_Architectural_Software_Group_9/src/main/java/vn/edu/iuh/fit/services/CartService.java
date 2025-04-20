/**
 * @ (#) CartService.java      3/20/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.response.CartItemResponse;
import vn.edu.iuh.fit.dtos.response.CartResponse;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/20/2025
 */
public interface CartService {
    CartResponse getCartByUserId(String token);

    List<CartItemResponse> getCartItemsByCartId(String token);

    CartResponse createCart(Long idUser);
}

/**
 * @ (#) CartItemServiceImpl.java      4/21/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.iuh.fit.dtos.request.CartItemRequest;
import vn.edu.iuh.fit.dtos.response.CartItemResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.Cart;
import vn.edu.iuh.fit.entities.CartDetail;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.entities.ids.CartDetailId;
import vn.edu.iuh.fit.exception.CustomJwtException;
import vn.edu.iuh.fit.exception.ItemNotFoundException;
import vn.edu.iuh.fit.repositories.CartDetailRepository;
import vn.edu.iuh.fit.repositories.CartRepository;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.services.CartItemService;
import vn.edu.iuh.fit.services.UserService;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/21/2025
 */
@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private CartItemResponse convertToDto(CartDetail cartDetail) {
        return CartItemResponse.builder()
                .idProduct(cartDetail.getProduct().getId())
                .idCart(cartDetail.getCart().getId())
                .name(cartDetail.getProduct().getProductName())
                .thumbnail(cartDetail.getProduct().getThumbnail())
                .price(cartDetail.getProduct().getPrice())
                .quantity(cartDetail.getQuantity())
                .total(cartDetail.getProduct().getPrice().multiply(BigDecimal.valueOf(cartDetail.getQuantity())))
                .build();
    }

    @Override
    public List<CartItemResponse> getCartItemsByCartId(String token) {
        if(token == null || token.isEmpty()) {
            return null;
        }

        UserResponse userResponse = userService.getCurrentUser(token);
        Cart cart = cartRepository.findByUserId(userResponse.getId());
        List<CartDetail> cartDetails = cart.getCartDetails();
        return cartDetails.stream().map(this::convertToDto).collect(Collectors.toList());
    }


}

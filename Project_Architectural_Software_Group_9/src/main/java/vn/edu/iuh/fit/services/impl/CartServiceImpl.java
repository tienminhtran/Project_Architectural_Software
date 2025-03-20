/**
 * @ (#) CartServiceImpl.java      3/20/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.CartItemResponse;
import vn.edu.iuh.fit.dtos.response.CartResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.Cart;
import vn.edu.iuh.fit.entities.CartDetail;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.repositories.CartRepository;
import vn.edu.iuh.fit.services.CartService;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/20/2025
 */
@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ModelMapper modelMapper;

    //entity to dto
    private CartResponse convertToDto(Cart cart) {
        return modelMapper.map(cart, CartResponse.class);
    }

    //dto to entity
    private Cart convertToEntity(CartResponse cartResponse) {
        return modelMapper.map(cartResponse, Cart.class);
    }

    private UserResponse convertToDto(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

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
    public CartResponse getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        UserResponse userResponse = convertToDto(cart.getUserId());

        List<CartDetail> cartDetails = cart.getCartDetails();
        List<CartItemResponse> cartItemResponses = cartDetails.stream().map(this::convertToDto).collect(Collectors.toList());
        return CartResponse.builder()
                .id(cart.getId())
                .user(userResponse)
                .items(cartItemResponses)
                .build();
    }

    @Override
    public List<CartItemResponse> getCartItemsByCartId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        List<CartDetail> cartDetails = cart.getCartDetails();
        return cartDetails.stream().map(this::convertToDto).collect(Collectors.toList());
    }
}

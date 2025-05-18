/*
 * @ {#} WishlistServiceImpl.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.WishlistRequest;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
import vn.edu.iuh.fit.dtos.response.WishlistResponse;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.entities.Wishlist;
import vn.edu.iuh.fit.entities.WishlistItem;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.repositories.WishlistItemRepository;
import vn.edu.iuh.fit.repositories.WishlistRepository;
import vn.edu.iuh.fit.services.UserService;
import vn.edu.iuh.fit.services.WishlistService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
@Service
@RequiredArgsConstructor
@Slf4j // dùng để log thông tin ra console
public class WishlistServiceImpl implements WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private WishlistItemRepository wishlistItemRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    private WishlistItemResponse convertToDto(Wishlist wishlist) {
        return modelMapper.map(wishlist, WishlistItemResponse.class);
    }

    private Wishlist convertToEntity(WishlistRequest request) {
        return modelMapper.map(request, Wishlist.class);
    }

    @Override
    public Optional<WishlistItemResponse> findById(Long id) {
        Optional<Wishlist> wishlist = wishlistRepository.findById(id);
        if (wishlist.isPresent()) {
            return Optional.of(modelMapper.map(wishlist.get(), WishlistItemResponse.class));
        }
        return Optional.empty();
    }

    @Override
    public WishlistItemResponse save(WishlistRequest request) {
        Wishlist wishlistEntity = this.convertToEntity(request);
        Wishlist wishlist = wishlistRepository.save(wishlistEntity);
        if (wishlist != null) {
            return this.convertToDto(wishlist);
        }
        return null;
    }

    @Override
    public boolean existsWishlist(Long userId) {
        Optional<Wishlist> wishlist = wishlistRepository.findById(userId);
        if (wishlist.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public WishlistResponse getWishlistByUserId(String token) {
        if (token == null || token.isEmpty()) {
            return null;
        }
        UserResponse userResponse = userService.getCurrentUser(token);
        Wishlist wishlist = wishlistRepository.findByUserId(userResponse.getId());
        List<WishlistItemResponse> wishlistItemResponses;
        if (wishlist == null || wishlist.getItems().isEmpty() || wishlist.getItems().size() == 0) {
            wishlistItemResponses = new ArrayList<>();
        } else {
            wishlistItemResponses = wishlist.getItems().stream()
                    .map(item -> modelMapper.map(item, WishlistItemResponse.class))
                    .collect(Collectors.toList());
        }
        return WishlistResponse.builder()
                .id(wishlist.getId())
                .user(userResponse)
                .items(wishlistItemResponses)
                .build();
    }

    @Override
    public WishlistResponse createWishlist(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
        if (wishlist == null) {
            wishlist = new Wishlist();
            wishlist.setUser(user);
            wishlist = wishlistRepository.save(wishlist);
        }
        return WishlistResponse.builder()
                .id(wishlist.getId())
                .user(modelMapper.map(user, UserResponse.class))
                .items(new ArrayList<>())
                .build();
    }


}


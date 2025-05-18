/*
 * @ {#} WishlistItemServiceImpl.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.WishlistItemRequest;
import vn.edu.iuh.fit.dtos.request.WishlistRequest;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.entities.Wishlist;
import vn.edu.iuh.fit.entities.WishlistItem;
import vn.edu.iuh.fit.exception.CustomJwtException;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.repositories.WishlistItemRepository;
import vn.edu.iuh.fit.repositories.WishlistRepository;
import vn.edu.iuh.fit.services.ProductService;
import vn.edu.iuh.fit.services.UserService;
import vn.edu.iuh.fit.services.WishlistItemService;
import vn.edu.iuh.fit.utils.Constant;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
@Service
@RequiredArgsConstructor
public class WishlistItemServiceImpl implements WishlistItemService {
    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private WishlistItemRepository wishlistItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;

    private WishlistItemResponse convertToDto(Wishlist wishlist) {
        return modelMapper.map(wishlist, WishlistItemResponse.class);
    }

    private Wishlist convertToEntity(WishlistRequest request) {
        return modelMapper.map(request, Wishlist.class);
    }


    @Override
    public Optional<WishlistItemResponse> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Optional<WishlistItemResponse> findByName(String name) {
        return Optional.empty();
    }

    @Override
    public List<WishlistItemResponse> getWishlistItemsByWishlistId(String token) {
        if (token == null || token.isEmpty()) {
            return null;
        }
        UserResponse userResponse = userService.getCurrentUser(token);
        Wishlist wishlist = wishlistRepository.findByUserId(userResponse.getId());
        if (wishlist == null) {
            return null;
        }
        List<WishlistItem> wishlistItems = wishlistItemRepository.findByWishlistIdAndStatus(wishlist.getId(), true);
        if (wishlistItems.isEmpty()) {
            return null;
        }
        List<WishlistItemResponse> wishlistItemResponses = wishlistItems.stream()
                .map(item -> modelMapper.map(item, WishlistItemResponse.class))
                .toList();
        return wishlistItemResponses;
    }

    @Override
    public WishlistItemResponse save(String token, WishlistItemRequest request) throws CustomJwtException {
        if (token == null || token.isEmpty()) {
            throw new CustomJwtException("Token is null or empty");
        }
        UserResponse userResponse = userService.getCurrentUser(token);
        Wishlist wishlist = wishlistRepository.findByUserId(userResponse.getId());
        // Kiểm tra wishlist đã tồn tại hay chưa. Nếu chưa thì tạo mới
        if (wishlist == null) {
            wishlist = new Wishlist();
            User user = userRepository.findById(userResponse.getId()).orElseThrow(() -> new CustomJwtException("User not found"));
            wishlist.setUser(user);
            wishlist = wishlistRepository.save(wishlist);
        }
        Product product = productRepository.findById(request.getIdProduct()).orElseThrow(() -> new CustomJwtException("Product not found"));
        // Kiểm tra nếu sản phẩm đã có trong wishlist (status=true) thì không thêm
        List<WishlistItem> existingItems = wishlistItemRepository.findByWishlistIdAndStatus(wishlist.getId(), true);
        boolean exists = existingItems.stream()
                .anyMatch(item -> item.getProduct().getId().equals(product.getId()));
        if (exists) {
            throw new CustomJwtException("Product already exists in wishlist");
        }

        WishlistItem wishlistItem = new WishlistItem();
        wishlistItem.setProduct(product);
        wishlistItem.setWishlist(wishlist);
        wishlistItem.setStatus(true);
        wishlistItem = wishlistItemRepository.save(wishlistItem);
        return modelMapper.map(wishlistItem, WishlistItemResponse.class);
    }

    @Override
    public boolean deleteWishlistItem(Long productId, String token) {
        if (productId == null) {
            throw new IllegalArgumentException("Product ID must not be null");
        }
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token must not be null or empty");
        }
        UserResponse userResponse = userService.getCurrentUser(token);
        Wishlist wishlist = wishlistRepository.findByUserId(userResponse.getId());
        if (wishlist == null) {
            throw new IllegalArgumentException("Wishlist not found for the user");
        }
        // Tìm WishlistItem theo wishlistId và productId
        List<WishlistItem> items = wishlistItemRepository.findByWishlistIdAndStatus(wishlist.getId(), true);
        WishlistItem wishlistItem = items.stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Product not found in wishlist"));
        wishlistItem.setStatus(false);
        wishlistItemRepository.save(wishlistItem);
        return true;
    }
}


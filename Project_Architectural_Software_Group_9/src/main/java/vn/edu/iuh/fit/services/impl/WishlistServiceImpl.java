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
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.Wishlist;
import vn.edu.iuh.fit.entities.WishlistItem;
import vn.edu.iuh.fit.repositories.WishlistItemRepository;
import vn.edu.iuh.fit.repositories.WishlistRepository;
import vn.edu.iuh.fit.services.WishlistService;

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
    public List<WishlistItemResponse> getWishlistByUserId(Long userId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId);
        if (wishlist == null || wishlist.getItems() == null) {
            return List.of();
        }
        return wishlist.getItems().stream().map(item -> {
            Product product = item.getProduct();
            return WishlistItemResponse.builder()
                    .thumbnail(product.getThumbnail())
                    .title(product.getProductName())
                    .unitPrice(product.getPrice() != null ? product.getPrice().toString() : null)
                    .status(Boolean.TRUE.equals(item.getStatus()))
                    .productId(product.getId())
                    .isUrlImg(product.getThumbnail() != null && (product.getThumbnail().startsWith("http://") || product.getThumbnail().startsWith("https://")))
                    .build();
        }).collect(Collectors.toList());
    }
}


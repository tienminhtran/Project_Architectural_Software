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
import vn.edu.iuh.fit.dtos.request.WishlistRequest;
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
import vn.edu.iuh.fit.entities.Wishlist;
import vn.edu.iuh.fit.entities.WishlistItem;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.repositories.WishlistItemRepository;
import vn.edu.iuh.fit.repositories.WishlistRepository;
import vn.edu.iuh.fit.services.ProductService;
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
    private ModelMapper modelMapper;

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
    public WishlistItemResponse save(WishlistRequest request) {
        return null;
    }
}


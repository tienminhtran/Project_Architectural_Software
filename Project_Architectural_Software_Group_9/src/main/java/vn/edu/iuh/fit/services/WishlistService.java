/*
 * @ {#} WishlishService.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.request.WishlistRequest;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
import vn.edu.iuh.fit.dtos.response.WishlistResponse;
import vn.edu.iuh.fit.entities.Wishlist;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
public interface WishlistService {
    Optional<WishlistItemResponse> findById(Long id);

    WishlistItemResponse save(WishlistRequest request);

    boolean existsWishlist(Long userId);

    WishlistResponse getWishlistByUserId(String token);

    WishlistResponse createWishlist(Long userId);
}

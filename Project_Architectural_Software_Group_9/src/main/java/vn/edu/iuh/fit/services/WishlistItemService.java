/*
 * @ {#} WishlistItemService.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.request.WishlistItemRequest;
import vn.edu.iuh.fit.dtos.request.WishlistRequest;
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
import vn.edu.iuh.fit.entities.Wishlist;
import vn.edu.iuh.fit.entities.WishlistItem;
import vn.edu.iuh.fit.exception.CustomJwtException;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
public interface WishlistItemService {
    Optional<WishlistItemResponse> findById(Long id);

    Optional<WishlistItemResponse> findByName(String name);

    List<WishlistItemResponse> getWishlistItemsByWishlistId(String token);

    WishlistItemResponse save(String token, WishlistItemRequest request) throws CustomJwtException;

    boolean deleteWishlistItem(Long wishlistItemId, String token);
}

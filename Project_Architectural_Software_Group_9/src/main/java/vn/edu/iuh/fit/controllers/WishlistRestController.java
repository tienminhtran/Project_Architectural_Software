/*
 * @ {#} WishlistRestController.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.WishlistRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
import vn.edu.iuh.fit.services.WishlistItemService;
import vn.edu.iuh.fit.services.WishlistService;

import java.util.List;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
@RestController
@RequestMapping("/api/v1/wishlists")
public class WishlistRestController {
    @Autowired
    private WishlistService wishlistService;
    @Autowired
    private WishlistItemService wishlistItemService;

    @GetMapping("/{userId}/items")
    @ResponseBody
    public ResponseEntity<BaseResponse<?>> getWishlistItemsByUserId(@PathVariable Long userId) {
        List<WishlistItemResponse> wishlistItems = wishlistService.getWishlistByUserId(userId);
        if (wishlistItems.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("get all product in wishlist").response(wishlistItems).build());
    }

    @PostMapping("/item")
    public ResponseEntity<BaseResponse<?>> addProductToWishlist(@RequestBody WishlistRequest request) {
        WishlistItemResponse wishlistItemResponse = wishlistItemService.save(request);
        if (wishlistItemResponse == null) {
            return ResponseEntity.badRequest().body(BaseResponse.builder().status("FAIL").message("Product already in wishlist").build());
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("add product to wishlist").response(wishlistItemResponse).build());
    }

    @DeleteMapping("/item/{wishlistItemId}")
    public void removeProductFromWishlist(@PathVariable Long wishlistItemId) {
        wishlistItemService.deleteById(wishlistItemId);
    }
}


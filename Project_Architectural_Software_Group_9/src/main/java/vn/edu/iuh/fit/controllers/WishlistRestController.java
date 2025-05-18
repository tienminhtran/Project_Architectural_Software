/*
 * @ {#} WishlistRestController.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.WishlistItemRequest;
import vn.edu.iuh.fit.dtos.request.WishlistRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
import vn.edu.iuh.fit.dtos.response.WishlistResponse;
import vn.edu.iuh.fit.entities.WishlistItem;
import vn.edu.iuh.fit.exception.CustomJwtException;
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

    @GetMapping("/me")
    public ResponseEntity<BaseResponse<?>> getWishlistOfMe(@RequestHeader("Authorization") String token) {
        WishlistResponse wishlistResponse = wishlistService.getWishlistByUserId(token);
        if (wishlistResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("get wishlist of me").response(wishlistResponse).build());
    }

    @GetMapping("/me/items")
    public ResponseEntity<BaseResponse<?>> getWishlistItemOfMe(@RequestHeader("Authorization") String token) {
        List<?> wishlistResponse = wishlistItemService.getWishlistItemsByWishlistId(token);
        if (wishlistResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("get wishlist item of me").response(wishlistResponse).build());
    }

    @PostMapping("/add")
    public ResponseEntity<BaseResponse<?>> addProductToWishlist(@RequestHeader("Authorization") String token, @RequestBody WishlistItemRequest request) {
        try {
            WishlistItemResponse wishlistItemResponse = wishlistItemService.save(token, request);
            return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("add product to wishlist").response(wishlistItemResponse).build());
        } catch (CustomJwtException e) {
            return ResponseEntity.status(401).body(BaseResponse.builder().status("FAIL").message(e.getMessage()).build());
        }
    }

    @DeleteMapping("/{id_product}/delete")
    public ResponseEntity<BaseResponse<?>> deleteProductFromWishlist(@PathVariable("id_product") Long idProduct, @RequestHeader("Authorization") String token) {
        boolean isDeleted = wishlistItemService.deleteWishlistItem(idProduct, token);
        if (isDeleted) {
            return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("delete product from wishlist").build());
        } else {
            return ResponseEntity.status(404).body(BaseResponse.builder().status("FAIL").message("product not found in wishlist").build());
        }
    }
}


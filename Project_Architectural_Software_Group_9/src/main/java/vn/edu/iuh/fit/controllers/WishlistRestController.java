/*
 * @ {#} WishlistRestController.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.response.WishlistItemResponse;
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

    @GetMapping("/{userId}/items")
    @ResponseBody
    public List<WishlistItemResponse> getWishlistItemsByUserId(@PathVariable Long userId) {
        return wishlistService.getWishlistByUserId(userId);
    }
}


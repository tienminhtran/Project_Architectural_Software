/*
 * @ {#} WishlistItemRepository.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.WishlistItem;

import java.util.List;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM WishlistItem wi WHERE wi.id = :wishlistItemId")
    void deleteWishlistItemById(Long wishlistItemId);

    void deleteAllByWishlistId(Long wishlistId);

    @Query("SELECT COUNT(wi) FROM WishlistItem wi WHERE wi.wishlist.id = :wishlistId")
    int countByWishlistId(@Param("wishlistId") Long id);

    List<WishlistItem> findByUserId(Long userId);
}

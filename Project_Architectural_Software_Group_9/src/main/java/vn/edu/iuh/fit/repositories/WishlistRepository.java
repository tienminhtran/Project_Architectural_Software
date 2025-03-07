/*
 * @ {#} WishlistRepository.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Wishlist;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    @Query("SELECT COUNT(w) > 0 FROM Wishlist w WHERE w.user.id = :userId")
    boolean existsByUserId(Long userId);

    @Query("SELECT w FROM Wishlist w WHERE w.user.id = :userId")
    Wishlist findByUserId(Long userId);
}

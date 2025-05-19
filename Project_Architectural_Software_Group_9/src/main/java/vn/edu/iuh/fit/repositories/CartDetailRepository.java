/**
 * @ (#) CartDetailRepository.java      4/21/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.entities.CartDetail;

import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/21/2025
 */
public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    CartDetail findByCartIdAndProductId(Long cartId, Long productId);
}

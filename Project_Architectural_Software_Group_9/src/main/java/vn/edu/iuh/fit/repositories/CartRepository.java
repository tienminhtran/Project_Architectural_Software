/**
 * @ (#) CartRepository.java      3/20/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Cart;
import vn.edu.iuh.fit.entities.User;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/20/2025
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("select c from Cart c join User u on c.userId.id = u.id where u.id = :userId")
    Cart findByUserId(Long userId);

}

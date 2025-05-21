/**
 * @ (#) UserRepository.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.User;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    @Query("SELECT COUNT(u) FROM User u JOIN Role r on u.role.id = r.id WHERE r.code = ?1")
    int countByRoleUser(String code);

    Optional<User> findByPhoneNumber(String phoneNumber);

    @Query("SELECT u, COUNT(o.id) " +
            "FROM User u " +
            "JOIN u.role r " +
            "JOIN Order o ON o.user = u " +
            "WHERE r.id = 1 " +
            "GROUP BY u.id")
    List<Object[]> countOrdersByUserWithRole1();

    // user có role = 1

    @Query("SELECT u FROM User u JOIN u.role r WHERE r.id = 1")
    List<User> findAllUserWithRole1();

    @Query("SELECT u FROM User u JOIN u.role r WHERE r.id = 1 AND u.active = true AND u.id NOT IN (SELECT o.user.id FROM Order o)")
    List<User> findUsersWithRole1AndNoOrders();

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.active = false WHERE u.id IN :ids")
    void updateStatusByIds(@Param("ids") List<Long> ids);


}

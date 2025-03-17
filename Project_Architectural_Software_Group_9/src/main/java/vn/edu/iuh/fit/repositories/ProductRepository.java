/**
 * @ (#) ProductRepository.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.Voucher;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    //    List<Product> findByNameContaining(String name);
    Product findByProductName(String name);

    List<Product> findByBrandName(String brandName);

    @Query("SELECT p FROM Product p ORDER BY  p.createdAt DESC LIMIT 5")
    List<Product> findRecentProducts();

    @Query("SELECT SUM(od.quantity * p.price) FROM Order o " +
            "JOIN OrderDetail od ON o.id = od.order.id " +
            "JOIN Product p ON od.product.id = p.id " +
            "WHERE o.status = 'COMPLETED'")
    Double calculateTotalRevenue();
}

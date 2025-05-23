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
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.Voucher;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
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


    /*
        Query to search product by productName, battery, cpu, description, graphicCard,monitor,os,port, price, ram,stockQuantity,warranty,weight
     */
    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:keyword% " +
            "OR p.battery LIKE %:keyword% " +
            "OR p.cpu LIKE %:keyword% OR p.description LIKE %:keyword% " +
            "OR p.graphicCard LIKE %:keyword% OR p.monitor LIKE %:keyword% " +
            "OR p.os LIKE %:keyword% " +
            "OR p.port LIKE %:keyword% OR p.port LIKE %:keyword% " +
            "OR p.ram LIKE %:keyword% " +
            "OR p.warranty LIKE %:keyword% ")
    Page<Product> searchProduct(String keyword, Pageable pageable);

    // thêm côt giá từ đâu -

    @Query("SELECT p FROM Product p " +
            "WHERE (:keyword IS NULL OR " +
            "LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.battery) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.cpu) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.graphicCard) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.monitor) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.os) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.port) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.ram) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.warranty) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice)")
    Page<Product> findProduct(
            @Param("keyword") String keyword,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable
    );
    List<Product> findByCategory_Name(String categoryName);

    List<Product> findByCategory_Id(Long categoryId);


}

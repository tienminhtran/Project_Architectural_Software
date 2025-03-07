/*
 * @ {#} OrderDetailRepository.java   1.0     07/03/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.dtos.response.BestSellingProductResponse;
import vn.edu.iuh.fit.entities.OrderDetail;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/*
 * @description:
 * @author: Tran Hien Vinh
 * @date:   07/03/2025
 * @version:    1.0
 */
@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Query("SELECT new vn.edu.iuh.fit.dtos.response.BestSellingProductResponse( " +
            "od.product.id, od.product.productName, " +
            "SUM(od.quantity), CAST(SUM(od.quantity * od.product.price) AS BIGDECIMAL)) " +  // Tính tổng doanh thu
            "FROM OrderDetail od " +
            "JOIN od.order o " +  // Nếu muốn lọc theo thời gian thì cần JOIN orders
            "WHERE o.createdAt BETWEEN :startDate AND :endDate " +  // Lọc theo thời gian
            "GROUP BY od.product.id, od.product.productName " +  // Nhóm theo sản phẩm
            "ORDER BY SUM(od.quantity * od.product.price) DESC "+ // Sắp xếp theo doanh thu giảm dần
            "LIMIT 10")
    List<BestSellingProductResponse> findBestSellingProducts(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);
}

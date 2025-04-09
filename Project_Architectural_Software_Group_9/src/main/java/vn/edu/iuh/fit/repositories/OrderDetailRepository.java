/*
 * @ {#} OrderDetailRepository.java   1.0     07/03/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.dtos.response.BestSellingProductResponse;
import vn.edu.iuh.fit.dtos.response.TopCustomerResponse;
import vn.edu.iuh.fit.entities.OrderDetail;
import vn.edu.iuh.fit.projection.DailyCategoryStats;

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
            "od.product.id, od.product.productName, od.product.thumbnail, od.product.category.name, od.product.brand.name, " +
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


    @Query("SELECT new vn.edu.iuh.fit.dtos.response.TopCustomerResponse(" +
            "o.user.id, " +
            "CONCAT(o.user.lastname, ' ', o.user.firstname), " + // Tên đầy đủ của khách hàng
            "o.user.phoneNumber, " +
            "o.user.email, " +
            "o.user.dayOfBirth, " +
            "CAST(SUM(od.quantity * od.product.price * (1 - COALESCE(v.value, 0) / 100)) AS BIGDECIMAL)" + // Tính tổng số tiền đã mua (đã giảm giá nếu có voucher)
            ") " +
            "FROM OrderDetail od " +
            "JOIN od.order o " +
            "LEFT JOIN o.voucher v " + // Lấy tất cả các đơn hàng, kể cả không có voucher
            "WHERE o.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY o.user.id, o.user.lastname, o.user.firstname " +
            "ORDER BY SUM(od.quantity * od.product.price * (1 - COALESCE(v.value, 0) / 100)) DESC "+
            "LIMIT 10")
    List<TopCustomerResponse> findTopCustomers(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    List<OrderDetail> findByOrderId(Long orderId);

    @Query(value = """
        select cast(o.created_at as DATE) as created_at, 
                c.name as category_name, 
                sum(od.quantity) as total_quantity
        FROM order_details od
             JOIN orders o ON od.order_id = o.id
             JOIN products p ON od.product_id = p.id
             JOIN categories c ON p.category_id = c.id
        GROUP BY CAST(o.created_at AS DATE), c.name
        ORDER BY created_at 
""" , nativeQuery = true)
    List<DailyCategoryStats> findDailyCategoryStats();
}

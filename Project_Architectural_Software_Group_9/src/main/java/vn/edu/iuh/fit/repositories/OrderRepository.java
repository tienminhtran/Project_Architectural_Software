/**
 * @ (#) OrderRepository.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.dtos.response.DailyOrderResponse;
import vn.edu.iuh.fit.dtos.response.RecentOrderResponse;
import vn.edu.iuh.fit.entities.Order;
import vn.edu.iuh.fit.enums.OrderStatus;

import java.math.BigDecimal;
import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser_Username(String username);

    List<Order> findByStatus(OrderStatus status);

    // tim so dien thoai
//    List<Order> findByPhoneNumber(String phoneNumber);

    // tim payment
    List<Order> findByPayment_PaymentName(String payment);

    @Query("SELECT new vn.edu.iuh.fit.dtos.response.RecentOrderResponse(" +
            "o.id, " +
            "concat(u.lastname, ' ', u.firstname), " +
            "o.createdAt, " +
            "o.status, " +
            "CAST(SUM(od.quantity * od.product.price) AS BIGDECIMAL)) " +
            "FROM OrderDetail od " +
            "JOIN od.order o " +
            "JOIN o.user u " +
            "GROUP BY o.id, u.lastname, u.firstname, o.createdAt, o.status")
    List<RecentOrderResponse> findByCreateRecent();

    @Query("SELECT new vn.edu.iuh.fit.dtos.response.DailyOrderResponse(" +
            "count(o.id), " +
            "CAST(o.createdAt AS java.sql.Date)) " +
            "FROM Order o " +
            "GROUP BY CAST(o.createdAt AS java.sql.Date)")
    List<DailyOrderResponse> totalOrderByDay();

    @Query("SELECT SUM(od.quantity * od.product.price) " +
            "FROM OrderDetail od " +
            "JOIN od.order o " +
            "WHERE o.id = :orderId")
    Double calculateTotalAmountByOrderId(@Param("orderId") Long orderId);

    @Query("SELECT o FROM Order o " +
            "JOIN o.user u " +
            "JOIN o.payment p " +
            "WHERE (:keyword IS NOT NULL AND u.firstname LIKE %:keyword%) OR " + "p.paymentName LIKE %:keyword%")
    Page<Order> searchOrder(String keyword, Pageable pageable);

    @Query("SELECT o FROM Order o " +
            "WHERE o.status = :status")
    Page<Order> filterByStatus(OrderStatus status, Pageable pageable);

    @Query("SELECT o FROM Order o " +
            "WHERE o.payment.paymentName LIKE %:payment%")
    Page<Order> filterByPayment(@Param("payment") String payment, Pageable pageable);

    // lọc theo nhiều trường: firstname, phoneNumber, payment, status
    @Query("SELECT o FROM Order o " +
            "JOIN o.user u " +
            "JOIN o.payment p " +
            "WHERE (:firstname IS NULL OR u.firstname LIKE %:firstname%) AND " +
            "(:phoneNumber IS NULL OR u.phoneNumber LIKE %:phoneNumber%) AND " +
            "(:payment IS NULL OR p.paymentName LIKE %:payment%) AND " +
            "(:status IS NULL OR o.status = :status)")
    Page<Order> filterByAll(@Param("firstname") String firstname,
                            @Param("phoneNumber") String phoneNumber,
                            @Param("payment") String payment,
                            @Param("status") OrderStatus status,
                            Pageable pageable);



    @Query("SELECT o FROM Order o " +
            "JOIN o.user u " +
            "WHERE u.id = :idUser")
    List<Order> findByIDUser(@Param("idUser") Long idUser);


    @Query("SELECT o FROM Order o " +
            "JOIN o.user u " +
            "WHERE u.phoneNumber = :phoneNumber")
    List<Order> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Query("SELECT o FROM Order o " +
            "JOIN o.user u " +
            "WHERE u.id = :userId AND o.status = :status")
    List<Order> findByUserIdAndStatus(Long userId, OrderStatus status);

    @Query("SELECT SUM(od.quantity) FROM OrderDetail od " +
            "JOIN od.order o " +
            "WHERE o.id = :orderId")
    int getTotalProductByOrderId(@Param("orderId") Long orderId);
}

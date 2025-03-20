/**
 * @ (#) OrderRepository.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Order;
import vn.edu.iuh.fit.enums.OrderStatus;

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


}

/**
 * @ (#) OrderService.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.response.OrderDetailResponse;
import vn.edu.iuh.fit.dtos.response.OrderResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.RecentOrderResponse;
import vn.edu.iuh.fit.enums.OrderStatus;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
public interface OrderService {
    List<OrderResponse> findByUsername(String username);

    OrderResponse findById(Long id);

    PageResponse<OrderResponse> findAll(int pageNo, int pageSize);

    int getTotalOrders();

    List<RecentOrderResponse> getRecentlyOrders();

    int getTotalProductSold();

    int getTotalOrderPending();

    boolean updateOrderStatus(Long orderId, OrderStatus orderStatus);

    List<OrderDetailResponse> getOrderDetailsByOrderId(Long orderId);

    String cancelOrder(Long orderId);

//    Tìm kiếm đơn hàng theo tên khách hàng
    List<OrderResponse> findByCustomerName(String customerName);

    List<OrderResponse> findByNamePayMent(String namePayment);

    // tìm payment
//    List<OrderResponse> findByPayment(String payment);

//    Chuyển status sang Cancelled



}

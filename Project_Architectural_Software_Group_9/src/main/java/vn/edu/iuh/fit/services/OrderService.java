/**
 * @ (#) OrderService.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.request.OrderRequest;
import vn.edu.iuh.fit.dtos.response.*;
import vn.edu.iuh.fit.entities.Order;
import vn.edu.iuh.fit.enums.OrderStatus;
import vn.edu.iuh.fit.exception.CancelOrderException;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;

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

    String cancelOrder(Long orderId) throws CancelOrderException;

    //    Tìm kiếm đơn hàng theo tên khách hàng
    List<OrderResponse> findByCustomerName(String customerName);

    List<OrderResponse> findByNamePayMent(String namePayment);

    List<DailyOrderResponse> totalOrderByDay();

    boolean delete(Long id);

    public Double getTotalAmountByOrderId(Long orderId);

    PageResponse<OrderResponse> searchOrder(String keyword, int pageNo, int pageSize);

    PageResponse<OrderResponse> filterByStatus(OrderStatus status, int pageNo, int pageSize);

    PageResponse<OrderResponse> filterByPayment(String payment, int pageNo, int pageSize);

    PageResponse<OrderResponse> filterByAll(String firstname, String phoneNumber, String payment, OrderStatus status, int pageNo, int pageSize);

    OrderResponse createOrder(OrderRequest orderRequest) throws UserAlreadyExistsException;

    List<OrderResponse> findByIDUser(Long idUser);

    List<OrderResponse> findByPhoneNumber(String phoneNumber);

    List<OrderResponse> findByUserIdAndStatus(Long userId, OrderStatus status);
}

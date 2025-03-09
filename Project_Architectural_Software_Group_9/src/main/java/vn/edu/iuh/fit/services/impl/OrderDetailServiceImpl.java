/*
 * @ {#} OrderDetailServiceImpl.java   1.0     09/03/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.OrderDetailResponse;
import vn.edu.iuh.fit.dtos.response.OrderItemResponse;
import vn.edu.iuh.fit.entities.Order;
import vn.edu.iuh.fit.entities.OrderDetail;
import vn.edu.iuh.fit.repositories.OrderDetailRepository;
import vn.edu.iuh.fit.services.OrderDetailService;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/*
 * @description:
 * @author: Tran Hien Vinh
 * @date:   09/03/2025
 * @version:    1.0
 */
@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    private OrderItemResponse convertToOrderItemDto(OrderDetail orderDetail) {
        BigDecimal unitPrice = orderDetail.getProduct().getPrice();
        BigDecimal totalPrice = unitPrice.multiply(BigDecimal.valueOf(orderDetail.getQuantity()));

        return new OrderItemResponse(
                orderDetail.getProduct().getProductName(),
                orderDetail.getQuantity(),
                unitPrice,
                totalPrice
        );
    }

    @Override
    public OrderDetailResponse getOrderDetailsByOrderId(Long orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
        if (orderDetails.isEmpty()) {
            throw new RuntimeException("Order not found");
        }

        // Lấy thông tin đơn hàng từ OrderDetail đầu tiên vì tất cả OrderDetail cùng thuộc một đơn hàng
        Order order = orderDetails.stream()
                .map(OrderDetail::getOrder)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Order not found"));


        // Chuyển đổi từ OrderDetail sang OrderItemResponse
        List<OrderItemResponse> items = orderDetails.stream()
                .map(this::convertToOrderItemDto)
                .collect(Collectors.toList());

        // Tính tổng giá trị đơn hàng
        BigDecimal totalPrice = items.stream()
                // Nếu totalPrice không null thì lấy totalPrice, ngược lại lấy 0
                .map(item -> item.getTotalPrice() != null ? item.getTotalPrice() : BigDecimal.ZERO)
                // Cộng dồn các totalPrice lại
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new OrderDetailResponse(
                order.getId(),
                order.getUser().getLastname() + " " + order.getUser().getFirstname(),
                order.getCreatedAt(),
                totalPrice,
                items
        );
    }
}

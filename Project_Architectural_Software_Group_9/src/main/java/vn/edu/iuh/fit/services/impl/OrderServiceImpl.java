/**
 * @ (#) OrderServiceImpl.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.*;
import vn.edu.iuh.fit.entities.Order;
import vn.edu.iuh.fit.entities.OrderDetail;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.enums.OrderStatus;
import vn.edu.iuh.fit.repositories.OrderRepository;
import vn.edu.iuh.fit.services.OrderService;

import java.util.List;
import java.util.stream.Collectors;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    //entity to dto
    private OrderResponse convertToDto(Order order) {
        return modelMapper.map(order, OrderResponse.class);
    }

    //dto to entity
    private Order convertToEntity(OrderResponse orderResponse) {
        return modelMapper.map(orderResponse, Order.class);
    }

    @Override
    public List<OrderResponse> findByUsername(String username) {
        List<Order> orders = orderRepository.findByUser_Username(username);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public OrderResponse findById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDto(order);
    }

    @Override
    public PageResponse<OrderResponse> findAll(int pageNo, int pageSize) {
        Pageable page = PageRequest.of(pageNo, pageSize);
        Page<Order> orders = orderRepository.findAll(page);
        PageResponse<OrderResponse> response = new PageResponse<>();
        if (orders.hasContent()) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(orders.getNumberOfElements());
            response.setTotalPages(orders.getTotalPages());
            response.setValues(orders.stream().map(this::convertToDto).toList());
        }
        return response;
    }

    @Override
    public int getTotalOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.size();
    }

    @Override
    public List<RecentOrderResponse> getRecentlyOrders() {
        return orderRepository.findByCreateRecent()
                .stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                .sorted(((o1, o2) -> o2.getOrderDate().compareTo(o1.getOrderDate())))
                .limit(6)
                .collect(Collectors.toList());
    }

    @Override
    public int getTotalProductSold() {
        List<Order> orders = orderRepository.findByStatus(OrderStatus.DELIVERED);
        return orders.stream()
                .flatMap(order -> order.getOrderDetails().stream())
                .mapToInt(OrderDetail::getQuantity)
                .sum();
    }

    @Override
    public int getTotalOrderPending() {
        List<Order> orders = orderRepository.findByStatus(OrderStatus.PENDING);
        return orders.size();
    }

    @Override
    public boolean updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(orderStatus);
        orderRepository.save(order);
        return true;
    }

    @Override
    public List<OrderDetailResponse> getOrderDetailsByOrderId(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return order.getOrderDetails().stream()
                .map(orderDetail -> modelMapper.map(orderDetail, OrderDetailResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public String cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        if(order.getStatus() == OrderStatus.PENDING) {
            if(order.getPayment().getPaymentName().equals("cod")) {
                order.setStatus(OrderStatus.CANCELLED);
                orderRepository.save(order);
                return "Order cancelled successfully";
            }
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
            return "Order cancelled successfully. Refund will be processed within 1-2 working days.";
        }
        return "Status Order is "+order.getStatus()+". Order cannot be cancelled.";
    }

    @Override
    public List<OrderResponse> findByCustomerName(String customerName) {
        List<Order> orders = orderRepository.findByUser_Username(customerName);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> findByNamePayMent(String namePayment) {
        List<Order> orders = orderRepository.findByPayment_PaymentName(namePayment);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<DailyOrderResponse> totalOrderByDay() {
        return orderRepository.totalOrderByDay();
    }

    @Override
    public boolean delete(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return true;
    }

    @Override
    public Double getTotalAmountByOrderId(Long orderId) {
        return orderRepository.calculateTotalAmountByOrderId(orderId);
    }

    @Override
    public PageResponse<OrderResponse> searchOrder(String keyword, int pageNo, int pageSize) {
    if (keyword == null || keyword.trim().isEmpty()) {
        throw new IllegalArgumentException("Keyword must not be null or empty");
    }
    Pageable pageable = PageRequest.of(pageNo, pageSize);
    Page<Order> orders = orderRepository.searchOrder(keyword, pageable);
    PageResponse<OrderResponse> response = new PageResponse<>();
    if (orders.hasContent()) {
        response.setPage(pageNo);
        response.setSize(pageSize);
        response.setTotal(orders.getNumberOfElements());
        response.setTotalPages(orders.getTotalPages());
        response.setValues(orders.stream().map(this::convertToDto).collect(Collectors.toList()));
    }
    return response;
}

    @Override
    public PageResponse<OrderResponse> filterByStatus(OrderStatus status, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orders = orderRepository.filterByStatus(status, pageable);
        PageResponse<OrderResponse> response = new PageResponse<>();
        if (orders.hasContent()) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(orders.getNumberOfElements());
            response.setTotalPages(orders.getTotalPages());
            response.setValues(orders.stream().map(this::convertToDto).collect(Collectors.toList()));
        }
        return response;
    }

    @Override
    public PageResponse<OrderResponse> filterByPayment(String payment, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orders = orderRepository.filterByPayment(payment, pageable);
        PageResponse<OrderResponse> response = new PageResponse<>();
        if (orders.hasContent()) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(orders.getNumberOfElements());
            response.setTotalPages(orders.getTotalPages());
            response.setValues(orders.stream().map(this::convertToDto).collect(Collectors.toList()));
        }
        return response;
    }

    @Override
    public PageResponse<OrderResponse> filterByAll(String firstname, String phoneNumber, String payment, OrderStatus status, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orders = orderRepository.filterByAll(firstname, phoneNumber, payment, status, pageable);
        PageResponse<OrderResponse> response = new PageResponse<>();
        if (orders.hasContent()) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(orders.getNumberOfElements());
            response.setTotalPages(orders.getTotalPages());
            response.setValues(orders.stream().map(this::convertToDto).collect(Collectors.toList()));
        }
        return response;
    }


//    @Override
//    public List<OrderResponse> findByPayment(String payment) {
//        List<Order> orders = orderRepository.findByPayment(payment);
//        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
//    }
}

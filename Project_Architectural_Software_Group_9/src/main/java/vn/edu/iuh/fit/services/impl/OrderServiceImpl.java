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
import vn.edu.iuh.fit.dtos.response.OrderResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;
import vn.edu.iuh.fit.entities.Order;
import vn.edu.iuh.fit.entities.OrderDetail;
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
        if(orders.hasContent()) {
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
    public List<OrderResponse> getRecentlyOrders() {
        return orderRepository.findAll()
                .stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                .limit(6)
                .map(this::convertToDto)
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
}

/**
 * @ (#) OrderRestController.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.OrderResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.services.OrderService;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@RestController
@RequestMapping("/api/v1/orders")
public class OrderRestController {

    @Autowired
    private OrderService orderService;

    @GetMapping("")
    public ResponseEntity<BaseResponse<?>> getOrdersPage(@RequestParam(defaultValue = "0") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize) {
        if(pageNo == null) {
            pageNo = 0;
        }

        if(pageSize == null) {
            pageSize = 10;
        }

        PageResponse<?> pageResponse = orderService.findAll(pageNo, pageSize);
        if(pageResponse.getValues().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all orders page").response(pageResponse).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> getOrderById(@PathVariable Long id) {
        OrderResponse orderResponse = orderService.findById(id);
        if(orderResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get order by id").response(orderResponse).build());
    }

    @GetMapping("/me/{username}")
    public ResponseEntity<BaseResponse<?>> getOrdersByUsername(@PathVariable String username) {
        List<OrderResponse> orderResponses = orderService.findByUsername(username);
        if(orderResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get orders by username").response(orderResponses).build());
    }

    @GetMapping("/total")
    public ResponseEntity<BaseResponse<?>> getTotalOrders() {
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get total orders").response(orderService.getTotalOrders()).build());
    }

    @GetMapping("/recently")
    public ResponseEntity<BaseResponse<?>> getRecentlyOrders() {
        List<OrderResponse> orderResponses = orderService.getRecentlyOrders();
        if(orderResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get recent order").response(orderResponses).build());
    }

    @GetMapping("/total-product-sold")
    public ResponseEntity<BaseResponse<?>> getTotalProductSold() {
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get total product sold").response(orderService.getTotalProductSold()).build());
    }

    @GetMapping("/totalOrderPending")
    public ResponseEntity<BaseResponse<?>> getTotalOrderPending() {
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get total order pending").response(orderService.getTotalOrderPending()).build());
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<BaseResponse<?>> cancelOrder(@PathVariable Long orderId) {

        String message = orderService.cancelOrder(orderId);
        if(message == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message(message).build());
    }
}

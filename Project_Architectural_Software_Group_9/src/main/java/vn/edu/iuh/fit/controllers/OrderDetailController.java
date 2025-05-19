/*
 * @ {#} OrderDetailController.java   1.0     09/03/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.OrderDetailResponse;
import vn.edu.iuh.fit.services.OrderDetailService;

/*
 * @description:
 * @author: Tran Hien Vinh
 * @date:   09/03/2025
 * @version:    1.0
 */
@RestController
@RequestMapping("/api/v1/order-detail")
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    @GetMapping("/{orderId}")
    public ResponseEntity<BaseResponse<OrderDetailResponse>> getOrderDetail(@PathVariable Long orderId) {
        OrderDetailResponse orderDetailResponse = orderDetailService.getOrderDetailsByOrderId(orderId);
        return ResponseEntity.ok(BaseResponse.<OrderDetailResponse>builder().status("SUCCESS").message("Get order-details by orderId success").response(orderDetailResponse).build());
    }
}

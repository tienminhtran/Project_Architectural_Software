/**
 * @ (#) OrderService.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.response.OrderResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;

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

    List<OrderResponse> getRecentlyOrders();
}

/**
 * @ (#) ReportController.java      3/26/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.services.OrderService;
import vn.edu.iuh.fit.services.ReportService;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/26/2025
 */
@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ReportService reportService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping("/daily")
    public ResponseEntity<BaseResponse<?>> totalOrderByDay() {
        List<?> orderResponses = orderService.totalOrderByDay();
        if(orderResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get total order by day").response(orderResponses).build());
    }


    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping("/daily-category")
    public ResponseEntity<BaseResponse<?>> getDailyCategoryReport() {
        List<?> categoryReport = reportService.getDailyCategoryReport();
        if(categoryReport.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get total category by daily").response(categoryReport).build());
    }
}

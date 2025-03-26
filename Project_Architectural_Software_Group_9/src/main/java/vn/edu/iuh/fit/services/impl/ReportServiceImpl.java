/**
 * @ (#) ReportServiceImpl.java      3/26/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.DailyCategoryReportResponse;
import vn.edu.iuh.fit.projection.DailyCategoryStats;
import vn.edu.iuh.fit.repositories.OrderDetailRepository;
import vn.edu.iuh.fit.services.ReportService;

import java.sql.Date;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/26/2025
 */
@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<DailyCategoryReportResponse> getDailyCategoryReport() {
        List<DailyCategoryStats> stats = orderDetailRepository.findDailyCategoryStats();

        Map<Date, DailyCategoryReportResponse> responseMap = new LinkedHashMap<>();

        // duyet qua tat ca cac thong ke
        for(DailyCategoryStats stat : stats) {
            // tao moi dto neu chua co ngay do trong map
            //computeIfAbsent: neu chua co key trong map thi tao moi va them vao map
            // neu co roi thi lay ra tra ve value hien co
            DailyCategoryReportResponse report = responseMap.computeIfAbsent(
                    stat.getCreatedAt(), // key
                    k -> new DailyCategoryReportResponse(stat.getCreatedAt()) // value
            );
            // them thong ke vao dto map
            report.addCategoryReport(stat.getCategoryName(), stat.getTotalQuantity());
        }
        return new ArrayList<>(responseMap.values());
    }
}

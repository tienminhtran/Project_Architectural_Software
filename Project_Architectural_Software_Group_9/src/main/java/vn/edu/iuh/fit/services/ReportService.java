/**
 * @ (#) ReportService.java      3/26/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.response.DailyCategoryReportResponse;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/26/2025
 */
public interface ReportService {
    List<DailyCategoryReportResponse> getDailyCategoryReport();
}

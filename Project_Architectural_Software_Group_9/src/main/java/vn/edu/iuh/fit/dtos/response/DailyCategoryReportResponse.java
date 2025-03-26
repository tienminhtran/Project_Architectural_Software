/**
 * @ (#) DailyCategoryReportResponse.java      3/26/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/26/2025
 */

@NoArgsConstructor
 @Getter
public class DailyCategoryReportResponse {
    private Date date;
    private Map<String, Long> categoryReport;

    public DailyCategoryReportResponse(Date date) {
        this.date = date;
        this.categoryReport = new HashMap<>();
    }

    /**
     * Add category report
     * @param category
     * @param count
     */
    public void addCategoryReport(String category, Long count) {
        this.categoryReport.put(category, count);
    }


}

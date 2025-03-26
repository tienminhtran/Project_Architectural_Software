/**
 * @ (#) DailyCategoryStats.java      3/26/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.projection;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Date;
import java.time.LocalDate;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/26/2025
 */
public interface DailyCategoryStats {
    // created_at duoc anh xa tu cot trong cau lenh sql
    @Value("#{target.created_at}")
    Date getCreatedAt();

    // category_name duoc anh xa tu cot trong cau lenh sql
    @Value("#{target.category_name}")
    String getCategoryName();

    // total_quantity duoc anh xa tu cot trong cau lenh sql
    @Value("#{target.total_quantity}")
    Long getTotalQuantity();
}

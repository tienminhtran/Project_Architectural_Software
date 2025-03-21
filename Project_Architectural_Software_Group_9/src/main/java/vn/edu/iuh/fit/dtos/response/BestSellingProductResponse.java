/*
 * @ {#} BestSellingProductResponse.java   1.0     07/03/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/*
 * @description:
 * @author: Tran Hien Vinh
 * @date:   07/03/2025
 * @version:    1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BestSellingProductResponse {
    private Long productId;
    private String productName;
    private String thumbnail;
    private String categoryName;
    private String brandName;
    private Long totalSold;
    private BigDecimal totalRevenue;
}

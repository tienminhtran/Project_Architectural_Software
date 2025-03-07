/*
 * @ {#} TopCustomerResponse.java   1.0     07/03/2025
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
public class TopCustomerResponse {
    private Long userId;
    private String fullName;
    private BigDecimal totalSpent;
}

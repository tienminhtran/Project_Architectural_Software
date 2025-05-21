/*
 * @ {#} OrderItemResponse.java   1.0     09/03/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

/*
 * @description:
 * @author: Tran Hien Vinh
 * @date:   09/03/2025
 * @version:    1.0
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemResponse {
    private String productName;
    private Long productId;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
}

/**
 * @ (#) RecentOrderResponse.java      3/24/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.*;
import vn.edu.iuh.fit.enums.OrderStatus;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/24/2025
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RecentOrderResponse implements Serializable {
    private Long id;
    private String fullName;
    private LocalDateTime orderDate;
    private OrderStatus status;
    private BigDecimal amount;
}

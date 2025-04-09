/**
 * @ (#) DailyOrderResponse.java      3/24/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.*;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;
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
public class DailyOrderResponse implements Serializable {
    private Long totalOrder;
    private Date createdAt;
}

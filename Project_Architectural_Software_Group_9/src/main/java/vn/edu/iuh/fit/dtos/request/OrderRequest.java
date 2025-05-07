/*
 * @ {#} OrderRequest.java   1.0     01/05/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dtos.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

/*
 * @description:
 * @author: Tran Hien Vinh
 * @date:   01/05/2025
 * @version:    1.0
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
    @NotNull(message = "Người dùng không được để trống")
    private Long userId;
    private String paymentMethod;
    private Long voucherId;
    private Long addressId;
    private List<OrderDetailRequest> orderDetails;
    private String status;
}

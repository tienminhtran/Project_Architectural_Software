/*
 * @ {#} OrderDetailRequest.java   1.0     01/05/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dtos.request;

import lombok.*;

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
public class OrderDetailRequest {
    private Long productId;
    private int quantity;
}

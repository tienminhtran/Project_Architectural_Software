/*
 * @ {#} OrderDetailService.java   1.0     09/03/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.response.OrderDetailResponse;

/*
 * @description:
 * @author: Tran Hien Vinh
 * @date:   09/03/2025
 * @version:    1.0
 */
public interface OrderDetailService {
    OrderDetailResponse getOrderDetailsByOrderId(Long orderId);
}

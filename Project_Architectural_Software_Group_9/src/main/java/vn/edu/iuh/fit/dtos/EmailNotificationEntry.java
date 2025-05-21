/**
 * @ (#) EmailVerifyEntry.java      4/13/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * @description:
 * @author: Tien Minh Tran
 * @date: 4/13/2025
 */
@NoArgsConstructor @AllArgsConstructor
@Builder
@Data
public class EmailNotificationEntry {
    private long timestamp;
}

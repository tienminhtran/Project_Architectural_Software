/**
 * @ (#) CartResponse.java      3/20/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.*;

import java.io.Serializable;
import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/20/2025
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponse implements Serializable {
    private Long id;
    private UserResponse user;
    private List<CartItemResponse> items;
}

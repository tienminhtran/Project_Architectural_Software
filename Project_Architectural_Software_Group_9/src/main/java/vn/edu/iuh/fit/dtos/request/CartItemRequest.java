/**
 * @ (#) CartItemRequest.java      4/21/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/21/2025
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemRequest implements Serializable {
    @JsonProperty("id_product")
    private Long idProduct;
    private double price;
    private int quantity;
}

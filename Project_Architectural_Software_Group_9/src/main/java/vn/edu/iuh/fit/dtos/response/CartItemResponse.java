/**
 * @ (#) CartItemResponse.java      3/20/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;

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
public class CartItemResponse implements java.io.Serializable{
    @JsonProperty("id_product")
    private Long idProduct;

    @JsonProperty("id_cart")
    private Long idCart;
    private String name;
    private String thumbnail;
    private BigDecimal price;
    private int quantity;
    private BigDecimal total;
}

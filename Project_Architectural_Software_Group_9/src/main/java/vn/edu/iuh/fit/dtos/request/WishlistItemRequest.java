/*
 * @ {#} WishlistItemRequest.java   1.0     5/18/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
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
 * @author: Nguyen Tan Thai Duong
 * @date:   5/18/2025
 * @version:    1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WishlistItemRequest implements Serializable {
    @JsonProperty("id_product")
    private Long idProduct;
//    private Long idWishlist;
}


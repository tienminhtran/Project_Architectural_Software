/*
 * @ {#} WishlistResponse.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistItemResponse implements Serializable {
    private String thumbnail;
    private String title;
    private String unitPrice;
    private boolean status;
    private Long productId;
    private boolean isUrlImg;
}


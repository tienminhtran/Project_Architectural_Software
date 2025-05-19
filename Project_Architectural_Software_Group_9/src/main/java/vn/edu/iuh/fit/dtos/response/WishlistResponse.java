/*
 * @ {#} WishlistResponse.java   1.0     5/18/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.*;

import java.io.Serializable;
import java.util.List;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   5/18/2025
 * @version:    1.0
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistResponse implements Serializable {
    private Long id;
    private UserResponse user;
    private List<WishlistItemResponse> items;
}


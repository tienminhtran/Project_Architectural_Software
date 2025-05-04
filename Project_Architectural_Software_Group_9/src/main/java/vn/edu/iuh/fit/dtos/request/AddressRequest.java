/**
 * @ (#) AddressRequest.java      5/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/*
 * @description:
 * @author: Tien Minh Tran
 * @date: 5/4/2025
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressRequest implements Serializable {

    @NotBlank(message = "City must not be empty")
    private String city;

    @NotBlank(message = "District must not be empty")
    private String district;

    @NotBlank(message = "Street must not be empty")
    private String street;

    @NotBlank(message = "Detail Location must not be empty")
    private String detailLocation;

    @NotNull(message = "User ID must not be null")
    private Long userId;  // Thêm userId
}

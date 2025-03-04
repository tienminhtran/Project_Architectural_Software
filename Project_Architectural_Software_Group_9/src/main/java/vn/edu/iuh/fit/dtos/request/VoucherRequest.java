/**
 * @ (#) VoucherRequest.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VoucherRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    @NotBlank(message = "Voucher code cannot be blank")
    private String name;

    @NotNull(message = "Value cannot be null")
    @DecimalMin(value = "1.00", message = "Value must be at least 1")
    @DecimalMax(value = "100.00", message = "Value must be at most 100")
    @Digits(integer = 10, fraction = 2, message = "Value should have up to 10 integer digits and 2 decimal places")
    private double value;

    @NotNull(message = "Expired date cannot be null")
    @Future(message = "Expired date must be in the future")
    private LocalDate expiredDate;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}

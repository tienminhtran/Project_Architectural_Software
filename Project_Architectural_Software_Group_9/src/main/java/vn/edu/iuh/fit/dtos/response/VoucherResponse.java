package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.Voucher}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoucherResponse implements Serializable {
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Long id;
    @NotNull
    LocalDate expiredDate;
    @NotNull
    @Size(max = 255)
    String name;
    int quantity;
    double value;
}
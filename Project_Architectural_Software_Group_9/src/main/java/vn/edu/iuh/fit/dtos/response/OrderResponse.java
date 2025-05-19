package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import vn.edu.iuh.fit.enums.OrderStatus;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.Order}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse implements Serializable {
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Long id;
    @NotNull
    Boolean active;
    PaymentResponse payment;
    UserResponse user;
    VoucherResponse voucher;
    AddressResponse address;
    OrderStatus status;
    List<RatingResponse> ratings;
    int totalProduct;
    Double totalPrice;
}
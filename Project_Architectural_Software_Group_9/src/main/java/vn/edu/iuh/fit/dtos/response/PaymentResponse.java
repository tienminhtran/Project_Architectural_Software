package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.Payment}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponse implements Serializable {
    Long id;
    @NotNull
    @Size(max = 255)
    String paymentName;
}
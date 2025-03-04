package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.ids.RatingId}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RatingIdResponse implements Serializable {
    Long orderId;
    Long productId;
    Long userId;
}
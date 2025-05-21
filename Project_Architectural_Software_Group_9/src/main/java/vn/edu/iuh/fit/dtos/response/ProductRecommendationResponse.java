package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.Product}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRecommendationResponse implements Serializable {
    @Size(max = 255)
    private Long id;

    private String name;

    private String price;

    private String image;

    private String category;

}
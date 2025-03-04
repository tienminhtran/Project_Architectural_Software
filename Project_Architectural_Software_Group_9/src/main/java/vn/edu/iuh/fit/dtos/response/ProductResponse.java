package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
public class ProductResponse implements Serializable {
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Long id;
    @Size(max = 255)
    String battery;
    @Size(max = 255)
    String cpu;
    @Size(max = 255)
    String description;
    @Size(max = 255)
    String frontCamera;
    @Size(max = 255)
    String graphicCard;
    @Size(max = 255)
    String monitor;
    @NotNull
    @Size(max = 255)
    String productName;
    @Size(max = 255)
    String os;
    @Size(max = 255)
    String port;
    @Min(message = "Price of product must be greater than 0", value = 1)
    BigDecimal price;
    @Size(max = 255)
    String ram;
    @Size(max = 255)
    String rearCamera;
    int stockQuantity;
    @Size(max = 255)
    String thumbnail;
    @NotNull
    @Size(max = 255)
    String warranty;
    Double weight;
    Set<String> images;

    List<RatingResponse> ratings = new ArrayList<>();
}
package vn.edu.iuh.fit.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "Product's name must not be empty")
    private String name;

    @NotBlank(message = "Product's description must not be empty")
    private String description;

    @Min(value = 1000, message = "Product's price must be greater than or equal 1.000")
    @Max(value = 1000000000, message = "Price must be less than or equal to 1 million")
    @Digits(integer = 10, fraction = 2, message = "Giá trị phải có tối đa 10 chữ số nguyên và 2 chữ số thập phân")
    private BigDecimal price;

    private String cpu = "";

    private String ram = "";

    private String os = "";

    private String monitor = "";

    private Double weight = 0.0;

    private String battery = "";

    private String graphicCard = "";

    private String port = "";

    private String rearCamera = "";

    private String frontCamera = "";

    @Min(value = 1, message = "Product's stock quantity must be greater than 0")
    private Integer stockQuantity;

    @NotBlank(message = "Product's warranty must not be empty")
    private String warranty;

    private Long categoryId;

    private Long brandId;

    @JsonProperty("isUrlImage")
    private boolean isUrlImage;

    private List<MultipartFile> fileImage;
}

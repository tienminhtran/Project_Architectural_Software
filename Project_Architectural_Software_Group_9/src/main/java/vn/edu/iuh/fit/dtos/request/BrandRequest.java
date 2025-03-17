package vn.edu.iuh.fit.dtos.request;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:48 AM
 * @nameProject: Project_Architectural_Software
 */

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BrandRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    @NotBlank(message = "Brand name must not be empty")
    private String name;

    @Column(name = "brand_img", length = 10000)
    private List<MultipartFile> brandImg;

    private boolean active = true;


}

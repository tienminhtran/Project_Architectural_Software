package vn.edu.iuh.fit.dtos.response;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:48 AM
 * @nameProject: Project_Architectural_Software
 */

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BrandResponse implements Serializable {
    private Long id;
    @Size(max = 255)
    private String name;
    private String brandImg;
    private Boolean active;


}

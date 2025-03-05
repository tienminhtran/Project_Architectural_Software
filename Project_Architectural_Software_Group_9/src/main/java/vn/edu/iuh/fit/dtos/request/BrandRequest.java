package vn.edu.iuh.fit.dtos.request;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:48 AM
 * @nameProject: Project_Architectural_Software
 */

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BrandRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name="brand_img", length = 10000)
    private String brandImg;

    private boolean active;


}

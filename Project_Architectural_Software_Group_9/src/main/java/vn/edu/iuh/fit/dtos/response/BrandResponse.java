package vn.edu.iuh.fit.dtos.response;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:48 AM
 * @nameProject: Project_Architectural_Software
 */

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
    private String name;
    private String brandImg;
    private Boolean active = false;


}

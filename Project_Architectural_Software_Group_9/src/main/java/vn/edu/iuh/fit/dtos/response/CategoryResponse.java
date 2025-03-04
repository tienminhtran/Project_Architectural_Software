package vn.edu.iuh.fit.dtos.response;/*
 * @description:
 * @author: TienMinhTran
 * @date: 4/3/2025
 * @time: 3:25 PM
 * @nameProject: Project_Architectural_Software
 */

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryResponse implements Serializable {
    private Long id;
    private String name;
    private String description;
    private boolean active;
}

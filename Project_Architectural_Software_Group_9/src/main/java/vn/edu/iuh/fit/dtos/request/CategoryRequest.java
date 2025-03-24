package vn.edu.iuh.fit.dtos.request;/*
 * @description:
 * @author: TienMinhTran
 * @date: 4/3/2025
 * @time: 3:09 PM
 * @nameProject: Project_Architectural_Software
 */

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryRequest implements Serializable {

    //LẤY 4 thuoc tinh trong

    private static final long serialVersionUID = 1L;
    private Long id;

    @NotBlank(message = "Category name is required")
    private String name;

    private String description;

    private boolean active;
}

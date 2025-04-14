package vn.edu.iuh.fit.dtos.request;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:39 AM
 * @nameProject: Project_Architectural_Software
 */

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CodeControllerRequest {

    private String code;
    private String dateCreate;
    private int lifeCycle;

    boolean active;
}

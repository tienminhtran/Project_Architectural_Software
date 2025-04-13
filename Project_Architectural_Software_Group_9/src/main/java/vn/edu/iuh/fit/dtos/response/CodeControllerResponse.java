package vn.edu.iuh.fit.dtos.response;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:41 AM
 * @nameProject: Project_Architectural_Software
 */

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CodeControllerResponse {
    private Long id;
    private String dateCreate;
    private Integer lifeCycle;
    private boolean active;
}

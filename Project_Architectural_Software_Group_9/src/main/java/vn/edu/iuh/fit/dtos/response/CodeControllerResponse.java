package vn.edu.iuh.fit.dtos.response;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:41 AM
 * @nameProject: Project_Architectural_Software
 */

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CodeControllerResponse implements Serializable {

     String code;
     String dateCreate;
     int lifeCycle;
     boolean active;

}

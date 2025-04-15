package vn.edu.iuh.fit.entities;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:28 AM
 * @nameProject: Project_Architectural_Software
 */
/*
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `date_create` DATETIME NOT NULL,   -- Thêm kiểu dữ liệu cho trường date_create
  `life_cycle` INT NOT NULL,         -- Thêm kiểu dữ liệu cho trường life_cycle
  `active` BIT(1) NOT NULL,
 */

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "controlcodes")
public class CodeController {
    @Id
    @Column(name="ma_code")
    private String code;

    private String date_create;  // Định dạng chuỗi để lưu thời gian
    private int life_cycle;      // Vòng đời tính bằng giây
    private boolean active;      // Trạng thái hoạt động


}

package vn.edu.iuh.fit.repositories;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:31 AM
 * @nameProject: Project_Architectural_Software
 */

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.CodeController;

@Repository

public interface CodeControllerRepository extends JpaRepository<CodeController, Long> {
}

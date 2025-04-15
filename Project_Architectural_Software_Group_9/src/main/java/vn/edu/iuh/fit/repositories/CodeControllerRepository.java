package vn.edu.iuh.fit.repositories;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:31 AM
 * @nameProject: Project_Architectural_Software
 */

import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.CodeController;

import java.util.List;

@Repository

public interface CodeControllerRepository extends JpaRepository<CodeController, String> {

    List<CodeController> findAll();

    CodeController findByCode(String code);
}

package vn.edu.iuh.fit.repositories;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:49 AM
 * @nameProject: Project_Architectural_Software
 */

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Brand;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    Optional<Brand> findBrandById(Long id);

    boolean existsByName(String name);

    Optional<Brand> findByName(String name);
}

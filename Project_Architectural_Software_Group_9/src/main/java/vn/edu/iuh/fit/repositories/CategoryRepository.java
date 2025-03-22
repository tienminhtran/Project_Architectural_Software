package vn.edu.iuh.fit.repositories;/*
 * @description:
 * @author: TienMinhTran
 * @date: 4/3/2025
 * @time: 3:05 PM
 * @nameProject: BTL
 */

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Category;

import java.util.List;
import java.util.Optional;

@Repository

public interface CategoryRepository  extends JpaRepository<Category, Long>{
    List<Category> findCategoriesByName(String name);

    Optional<Category> findCategoryByName (String categoryName);

    Optional<Category> findCategoryById(Long id);

    //query theo name, description
    @Query("SELECT c FROM Category c WHERE c.name LIKE %:keyword% OR c.description LIKE %:keyword%")
    List<Category> findKeyWork(String keyword);
}

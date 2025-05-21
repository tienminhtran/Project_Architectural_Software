/**
 * @ (#) ProductRecommendationRepository.java      5/21/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.ProductRecommendation;

import java.util.List;

/*
 * @description:
 * @author: Tien Minh Tran
 * @date: 5/21/2025
 */
@Repository
public interface ProductRecommendationRepository extends JpaRepository<ProductRecommendation, Long> {

    // Custom query methods can be defined here if needed
    // For example, to find recommendations by product ID or category
//     List<ProductRecommendation> findByProductId(Long productId);
//     List<ProductRecommendation> findByCategory(String category);

    //find all
    List<ProductRecommendation> findAll();
}
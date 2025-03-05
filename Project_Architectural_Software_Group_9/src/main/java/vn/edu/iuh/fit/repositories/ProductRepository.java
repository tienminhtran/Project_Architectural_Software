/**
 * @ (#) ProductRepository.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.Voucher;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /*
        Bỏ mấy dòng này ra nó sẽ llo6ioi Sinh
     */
//    List<Product> findByNameContaining(String name);
//    Product findByProductName(String name);




}

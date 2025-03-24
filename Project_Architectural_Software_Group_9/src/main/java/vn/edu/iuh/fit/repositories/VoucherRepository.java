/**
 * @ (#) VoucherRepository.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.Voucher;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    Optional<Voucher> findByName(String name);

    List<Voucher> findByQuantityGreaterThan(int quantityIsGreaterThan);

    List<Voucher> findByQuantityGreaterThanAndExpiredDateGreaterThan(int quantityIsGreaterThan, LocalDate expiredDateIsGreaterThan);

    Voucher findByNameAndQuantityGreaterThanAndExpiredDateGreaterThan(String name, int quantityIsGreaterThan, LocalDate expiredDateIsGreaterThan);

    @Query("SELECT v FROM Voucher v " +
            "WHERE LOWER(TRIM(v.name)) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(TRIM(FUNCTION('STR', v.quantity))) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(TRIM(FUNCTION('STR', v.value))) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Voucher> findByKeyWord(String keyword, Pageable pageable);

}

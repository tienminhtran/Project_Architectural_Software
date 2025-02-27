/**
 * @ (#) VerTokenRepository.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entities.VerificationToken;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Repository
public interface VerTokenRepository extends JpaRepository<VerificationToken, Long> {
}

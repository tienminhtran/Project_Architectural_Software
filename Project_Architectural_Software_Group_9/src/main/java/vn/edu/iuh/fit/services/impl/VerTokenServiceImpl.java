/**
 * @ (#) VerTokenServiceImpl.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.entities.VerificationToken;
import vn.edu.iuh.fit.repositories.VerTokenRepository;
import vn.edu.iuh.fit.services.VerTokenService;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Service
public class VerTokenServiceImpl implements VerTokenService {

    @Autowired
    private VerTokenRepository verTokenRepository;
    @Override
    public VerificationToken create(VerificationToken verificationToken) {
        return verTokenRepository.save(verificationToken);
    }
}

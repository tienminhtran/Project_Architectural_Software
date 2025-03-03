/**
 * @ (#) RefreshService.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.RefreshToken;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.security.CustomUserDetails;

import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
public interface RefreshService {
    public RefreshToken createRefreshToken(CustomUserDetails customUserDetails);

    public Optional<RefreshToken> findByToken(String token);

    public boolean validateRefreshToken(String token);

    public void deleteByUser(UserResponse user);

}

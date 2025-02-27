/**
 * @ (#) AuthService.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */

import vn.edu.iuh.fit.dtos.request.AuthRequest;
import vn.edu.iuh.fit.dtos.response.AuthResponse;
import vn.edu.iuh.fit.security.CustomUserDetails;

public interface AuthService {
    public AuthResponse authenticate(AuthRequest authRequest);
}

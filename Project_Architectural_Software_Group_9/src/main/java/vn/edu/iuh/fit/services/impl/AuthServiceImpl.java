/**
 * @ (#) AuthServiceImpl.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.AuthRequest;
import vn.edu.iuh.fit.dtos.response.AuthResponse;
import vn.edu.iuh.fit.security.CustomUserDetails;
import vn.edu.iuh.fit.security.jwt.JwtTokenProvider;
import vn.edu.iuh.fit.services.AuthService;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Override
    public AuthResponse authenticate(AuthRequest authRequest) {
        // Xác thực thông tin người dùng Request
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate a JWT token
        String accessToken = jwtTokenProvider.generateAccessToken((CustomUserDetails) authentication.getPrincipal());
        String refreshToken = jwtTokenProvider.generateRefreshToken((CustomUserDetails) authentication.getPrincipal());

        return new AuthResponse(accessToken, refreshToken);
    }
}

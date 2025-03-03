/**
 * @ (#) RefreshServiceImpl.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.RefreshToken;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.repositories.RefreshTokenRepository;
import vn.edu.iuh.fit.security.CustomUserDetails;
import vn.edu.iuh.fit.security.jwt.JwtTokenProvider;
import vn.edu.iuh.fit.services.RefreshService;
import vn.edu.iuh.fit.services.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Service
public class RefreshServiceImpl implements RefreshService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private ModelMapper modelMapper;

    private User convertToEntity(UserResponse userResponse) {
        return modelMapper.map(userResponse, User.class);
    }

    @Override
    public RefreshToken createRefreshToken(CustomUserDetails customUserDetails) {
        UserResponse user = userService.findByUsername(customUserDetails.getUsername());
        User userEntity = convertToEntity(user);
        RefreshToken refreshToken = RefreshToken.builder()
                .token(jwtTokenProvider.generateRefreshToken(customUserDetails))
                .user(userEntity)
                .expiryDate(LocalDateTime.now().plusDays(7))
                .isConfirmed(false)
                .build();
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    public boolean validateRefreshToken(String token) {
        Optional<RefreshToken> refreshTokenOpt = findByToken(token);
        if (refreshTokenOpt.isEmpty()) {
            return false;
        }

        RefreshToken refreshToken = refreshTokenOpt.get();
        return !refreshToken.getExpiryDate().isBefore(LocalDateTime.now());
    }

    @Override
    public void deleteByUser(UserResponse user) {
        User userEntity = convertToEntity(user);
        refreshTokenRepository.deleteByUser(userEntity);
    }
}

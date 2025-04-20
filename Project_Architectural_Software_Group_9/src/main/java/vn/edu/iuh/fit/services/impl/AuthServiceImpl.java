/**
 * @ (#) AuthServiceImpl.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import io.jsonwebtoken.JwtException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.RefreshToken;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.exception.CustomJwtException;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.security.CustomUserDetails;
import vn.edu.iuh.fit.security.jwt.JwtTokenProvider;
import vn.edu.iuh.fit.dtos.request.AuthRequest;
import vn.edu.iuh.fit.dtos.response.AuthResponse;
import vn.edu.iuh.fit.services.AuthService;
import vn.edu.iuh.fit.services.CartService;
import vn.edu.iuh.fit.services.RefreshService;
import vn.edu.iuh.fit.services.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Autowired
    private RefreshService refreshService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;



    // entity to dto
    private UserResponse convertToDto(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

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
        RefreshToken refreshToken = refreshService.createRefreshToken((CustomUserDetails) authentication.getPrincipal());

        // Set roles
         List<String> roles = ((CustomUserDetails) authentication.getPrincipal())
                 .getAuthorities()
                 .stream()
                 .map(GrantedAuthority::getAuthority)
                 .collect(Collectors.toList());


        return new AuthResponse(accessToken, refreshToken.getToken(), roles, ((CustomUserDetails) authentication.getPrincipal()).getUsername());
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        Optional<RefreshToken> refreshTokenEntity = refreshService.findByToken(refreshToken);
        if(refreshTokenEntity.isEmpty() || !refreshService.validateRefreshToken(refreshToken)) {
            return null;
        }
        User user = refreshTokenEntity.get().getUser();
        CustomUserDetails customUserDetails = new CustomUserDetails(this.convertToDto(user));
        List<String> roles = customUserDetails
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        String newAccessToken = jwtTokenProvider.generateAccessToken(customUserDetails);

        return new AuthResponse(newAccessToken, refreshToken, roles, user.getUsername());
    }

    @Override
    public AuthResponse loginWithGoogle(String tokenId) throws CustomJwtException {
        if(tokenId == null  || tokenId.isEmpty()) {
            throw new CustomJwtException("Thieu Token ID tu google");
        }

        try {
            FirebaseToken deToken = FirebaseAuth.getInstance().verifyIdToken(tokenId);
            System.out.println("Token ID: " + deToken.getUid() + " - Email: " + deToken.getEmail() + " - Name: " + deToken.getName() + " - Picture: " + deToken.getPicture());
            String name = deToken.getName();
            String email = deToken.getEmail();
            String uid = deToken.getUid();
            String imageUrl = deToken.getPicture();

            // Kiểm tra xem người dùng đã tồn tại trong hệ thống chưa. Neu chưa thì tạo mới
            User user= userRepository.findByEmail(email).orElseGet(() -> userService.createGoogleUser(email, name, imageUrl));

            // Create a cart for the user
            cartService.createCart(user.getId());

            System.out.println("user " + this.convertToDto(user));
            // tao accessToken
            CustomUserDetails customUserDetails = new CustomUserDetails(this.convertToDto(user));

            String accessToken = jwtTokenProvider.generateAccessToken(customUserDetails);
            System.out.println("Access Token: " + accessToken);

            String refreshToken = refreshService.createRefreshToken(customUserDetails).getToken();
            System.out.println("Refresh Token: " + refreshToken);

            return new AuthResponse(accessToken, refreshToken,
                    customUserDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList()),
                    customUserDetails.getUsername());

        } catch (FirebaseAuthException e) {
            throw new CustomJwtException("Token ID không hợp lệ: " + e.getMessage());
        }
    }

}

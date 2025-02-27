/**
 * @ (#) AuthController.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dtos.request.AuthRequest;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.AuthResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.security.CustomUserDetails;
import vn.edu.iuh.fit.security.jwt.JwtTokenProvider;
import vn.edu.iuh.fit.services.AuthService;
import vn.edu.iuh.fit.services.UserService;

import java.util.LinkedHashMap;
import java.util.Map;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody AuthRequest authRequest,
                                                BindingResult bindingResult) {
        Map<String, Object> response = new LinkedHashMap<String, Object>();

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new LinkedHashMap<String, Object>();

            bindingResult.getFieldErrors().stream().forEach(result -> {
                errors.put(result.getField(), result.getDefaultMessage());
            });

            System.out.println(bindingResult);
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("errors", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {

            AuthResponse authResponse = authService.authenticate(authRequest);

            // Return the token in the response
            response.put("status", HttpStatus.OK.value());
            response.put("token", authResponse);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody UserRequest authRequest,
                                                BindingResult bindingResult) {
        Map<String, Object> response = new LinkedHashMap<String, Object>();

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new LinkedHashMap<String, Object>();

            bindingResult.getFieldErrors().stream().forEach(result -> {
                errors.put(result.getField(), result.getDefaultMessage());
            });

            System.out.println(bindingResult);
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("errors", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {

            UserResponse userResponse = userService.createUser(authRequest, bindingResult);

            // Return the token in the response
            response.put("status", HttpStatus.OK.value());
            response.put("data", userResponse);
            response.put("message", "User created successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }
}

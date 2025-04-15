/**
 * @ (#) AuthRestController.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.AuthRequest;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.AuthResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.exception.CustomJwtException;
import vn.edu.iuh.fit.exception.EmailAlreadyExistsException;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;
import vn.edu.iuh.fit.services.AuthService;
import vn.edu.iuh.fit.services.UserService;

import javax.naming.Binding;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthRestController {


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

    @PostMapping("/login/google")
    public ResponseEntity<Map<String, Object>> loginGoogle(@RequestBody Map<String, String> request, BindingResult bindingResult) throws CustomJwtException {

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
            String idToken = request.get("idToken");
            AuthResponse authResponse = authService.loginWithGoogle(idToken);
            System.out.println(authResponse);

            // Return the token in the response
            response.put("status", HttpStatus.OK.value());
            response.put("token", authResponse);
            response.put("message", "Login successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refresh(@RequestBody Map<String, String> request, BindingResult bindingResult) {
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
            String refreshToken = request.get("refreshToken");
            AuthResponse authResponse = authService.refreshToken(refreshToken);

            // Return the token in the response
            response.put("status", HttpStatus.OK.value());
            response.put("token", authResponse);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody UserRequest authRequest,
                                                BindingResult bindingResult) throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException {
        userService.validation(authRequest, bindingResult);

        Map<String, Object> response = new HashMap<String, Object>();

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new HashMap<String, Object>();

            bindingResult.getFieldErrors().stream().forEach(result -> {
                errors.put(result.getField(), result.getDefaultMessage());
            });

            System.out.println(bindingResult);
            return ResponseEntity.badRequest().body(Map.of("status", "FAILED", "message", errors));
        } else {

            UserResponse userResponse = userService.createUser(authRequest, bindingResult);

            // Return the token in the response
            response.put("status", HttpStatus.OK.value());
            response.put("data", userResponse);
            response.put("message", "User created successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAccount(@RequestParam(name = "email") String email,@RequestParam(name = "token") String token) {
        try {
            userService.verifyAccount(email,token);
            return ResponseEntity.ok("Verify account successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Verify account failed");
        }
    }
}

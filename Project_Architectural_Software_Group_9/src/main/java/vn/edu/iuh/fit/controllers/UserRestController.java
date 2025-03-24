/**
 * @ (#) UserRestController.java      2/28/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.ProductRequest;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.*;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.exception.EmailAlreadyExistsException;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;
import vn.edu.iuh.fit.security.CustomUserDetails;
import vn.edu.iuh.fit.security.jwt.JwtTokenProvider;
import vn.edu.iuh.fit.services.UserService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.*;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/28/2025
 */
@RestController
@RequestMapping("/api/v1/user")
public class UserRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtUtils;

    @Autowired
    private Validator validator;

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<UserResponse>> getUserById(@PathVariable Long id) {
        UserResponse userResponse = userService.findById(id);
        if (userResponse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<UserResponse>builder().status("success").message("Get user by id success").response(userResponse).build());
    }

    @GetMapping("/information/{username}")
    public ResponseEntity<BaseResponse<UserResponse>> getUserByUsername(@PathVariable String username) {
        UserResponse userResponse = userService.getUserByUsername(username);
        if (userResponse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<UserResponse>builder().status("success").message("Get user by username success").response(userResponse).build());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            Map<String, Object> response = userService.getCurrentUser(token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/createManager", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<?>> createManager(
            @RequestPart("user") String userJson,
            @RequestPart(value = "fileImage", required = false) MultipartFile fileImage,
            BindingResult bindingResult)
            throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException {


        // Chuyển user từ JSON String sang Object
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        UserRequest userRequest;
        try {
            userRequest = objectMapper.readValue(userJson, UserRequest.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON format: " + e.getMessage());
        }

        // Gán ảnh vào userRequest
        userRequest.setImage(fileImage);

        // Validate dữ liệu đầu vào
        userService.validation(userRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = bindingResult.getFieldErrors().stream()
                    .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));

            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("Validation failed")
                    .response(errors)
                    .build());
        }

        // Gọi service để tạo user
        UserResponse userResponse = userService.createUserRoleManager(userRequest, bindingResult);
        if (userResponse == null) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("Failed to create manager")
                    .build());
        }

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Create manager successfully")
                .response(userResponse)
                .build());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<BaseResponse<List<UserResponse>> > getAllUsers() {
        List<UserResponse> userResponses = userService.findAll();

        if (userResponses == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(BaseResponse.<List<UserResponse>>builder()
                .status("SUCCESS")
                .message("Get all users success")
                .response(userResponses).build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("")
    public ResponseEntity<BaseResponse<?>> getUsersByPage(@RequestParam(defaultValue = "0", required = false) Integer pageNo,
                                                                           @RequestParam(defaultValue = "10", required = false) Integer pageSize) {
        if (pageNo == null) {
            pageNo = 0;
        }
        if (pageSize == null) {
            pageSize = 5;
        }

        PageResponse<UserResponse> userResponses = userService.getUsersByPage(pageNo, pageSize);

        if (userResponses == null || userResponses.getValues().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Get users by page success")
                .response(userResponses).build());
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping("/topCustomers")
    public ResponseEntity<BaseResponse<List<TopCustomerResponse>> > getTopCustomers(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false)LocalDate endDate ) {

        int year = LocalDate.now().getYear();
        if (startDate == null) {
            startDate = LocalDate.of(year, 1, 1);
        }
        if (endDate == null) {
            endDate = LocalDate.of(year, 12, 31);
        }

        List<TopCustomerResponse> topCustomerResponses = userService.getTopCustomers(startDate, endDate);

        if (topCustomerResponses == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<List<TopCustomerResponse>>builder()
                .status("SUCCESS")
                .message("Get top customers success")
                .response(topCustomerResponses).build());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/countByRoleUser")
    public ResponseEntity<BaseResponse<Integer>> countByRoleUser() {
        int count = userService.countByRoleUser();
        return ResponseEntity.ok(BaseResponse.<Integer>builder()
                .status("SUCCESS")
                .message("Count by role user success")
                .response(count).build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/countByRoleManager")
    public ResponseEntity<BaseResponse<Integer>> countByRoleManager() {
        int count = userService.countByRoleManager();
        return ResponseEntity.ok(BaseResponse.<Integer>builder()
                .status("SUCCESS")
                .message("Count by role manager success")
                .response(count).build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<?>> updateUser(
            @PathVariable Long id,
            @RequestPart("user") String userJson,
            @RequestPart(value = "fileImage", required = false) MultipartFile fileImages) {

        // Chuyen string sang json
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        UserRequest userRequest;
        try {
            userRequest = objectMapper.readValue(userJson, UserRequest.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        //validation userRequest
        Set<ConstraintViolation<UserRequest>> violations = validator.validate(userRequest);
        if(!violations.isEmpty()) {
            Map<String, Object> errors = new HashMap<>();
            violations.forEach(violation -> {
                errors.put(violation.getPropertyPath().toString(), violation.getMessage());
            });
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("FAILED")
                    .message("Validation error")
                    .response(errors)
                    .build());
        }

        userRequest.setImage(fileImages);
        UserResponse newUser = userService.updateUser(id,userRequest);

        if (newUser == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Update user success")
                .response(newUser)
                .build());
    }

}

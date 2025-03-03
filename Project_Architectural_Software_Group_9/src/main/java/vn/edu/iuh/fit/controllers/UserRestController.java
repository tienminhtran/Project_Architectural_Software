/**
 * @ (#) UserRestController.java      2/28/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.services.UserService;

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

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<UserResponse>> getUserById(@PathVariable Long id) {
        UserResponse userResponse = userService.findById(id);
        if (userResponse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<UserResponse>builder().status("success").message("Get user by id success").response(userResponse).build());
    }

}

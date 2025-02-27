/**
 * @ (#) UserService.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import org.springframework.validation.BindingResult;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.UserResponse;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
public interface UserService {
    UserResponse getUserByUsername(String username);

    UserResponse createUser(UserRequest userRequest, BindingResult result);
    public UserResponse findById(Long id);
}

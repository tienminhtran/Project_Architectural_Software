/**
 * @ (#) UserService.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import org.springframework.validation.BindingResult;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
public interface UserService {
    UserResponse getUserByUsername(String username);

    UserResponse createUser(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException;
    public UserResponse findById(Long id);

    boolean existsUsername(String username);

    boolean existsEmail(String email);

    UserResponse findByUsername(String username);

    UserResponse createUserRoleManager(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException;

    List<UserResponse> findAll();
}

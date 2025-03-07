/**
 * @ (#) UserServiceImpl.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.Role;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;
import vn.edu.iuh.fit.repositories.RoleRepository;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.repositories.RefreshTokenRepository;
import vn.edu.iuh.fit.services.UserService;

import java.time.LocalDate;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    // Phương thức chuyển đổi User sang DTO với kiểu generic T
    private <T> T convertToDto(User user, Class<T> targetClass) {
        return modelMapper.map(user, targetClass);
    }

    // Phương thức chuyển đổi DTO sang User với kiểu generic T
    private <T> User convertToEntity(T tDto, Class<T> dtoClass) {
        return modelMapper.map(tDto, User.class);
    }

    private void validation(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException {
        // Kiem tra username da ton tai chua?

        if (this.existsUsername(userRequest.getUsername())) {
            result.addError(new FieldError("userRequest", "username",
                    "Username đã tồn tại. Vui lòng nhập username khác"));
            throw new UserAlreadyExistsException("Username already exist");
        }
        if (this.existsEmail(userRequest.getEmail())) {
            result.addError(new FieldError("userRequest", "email",
                    "Email đã tồn tại. Vui lòng nhập email khác"));
            throw new UserAlreadyExistsException("Email already exist");
        }

        if (!userRequest.getPassword().equals(userRequest.getConfirmPassword())) {
            result.addError(new FieldError("userRequest", "password",
                    "Mật khẩu không khớp"));
        }

        // Lấy day/month/year hiện tại, 11/2/2024 -> tru 15 năm -> 11/2/2009
        // giả sử một người có sinh nhật 1/2/2009 -> 1/2/2009 đã đu tuổi so voi day/month/year hiện tại
        // nên dùng isBefore (truoc rồi phủ định) chứ không dùng isAfter
        if (!userRequest.getDob().isBefore(LocalDate.now().minusYears(15))) {
            result.addError(new FieldError("userRequest", "dob",
                    "Ban chưa đủ 15 tuổi"));
        }
    }

    @Override
    public UserResponse getUserByUsername(String username) {
        if ("anonymousUser".equals(username)) {
            return null;
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Can not find User with username: " + username));
        return this.convertToDto(user, UserResponse.class);
    }

    @Override
    public UserResponse createUser(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException {

        Role role = roleRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: 1"));

        validation(userRequest, result);

        if(!result.hasErrors()) {
            User user = this.convertToEntity(userRequest, UserRequest.class);
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            user.setRole(role);

           user = userRepository.save(user);

            return this.convertToDto(user, UserResponse.class);
        }
        return null;
    }

    @Override
    public UserResponse findById(Long id) {
        return this.convertToDto(userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Can not find User with id: " + id)), UserResponse.class);
    }

    @Override
    public boolean existsUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserResponse findByUsername(String username) {
        return this.convertToDto(userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("Can not find User with username: " + username)), UserResponse.class);
    }

    @Override
    public UserResponse createUserRoleManager(UserRequest userRequest) {
        Role role = roleRepository.findById(3L).orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: 3"));

        User user = this.convertToEntity(userRequest, UserRequest.class);
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(role);

        user = userRepository.save(user);

        return this.convertToDto(user, UserResponse.class);
    }
}

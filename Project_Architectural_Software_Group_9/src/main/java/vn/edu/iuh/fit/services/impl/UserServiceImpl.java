/**
 * @ (#) UserServiceImpl.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.Role;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.entities.VerificationToken;
import vn.edu.iuh.fit.repositories.RoleRepository;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.repositories.VerTokenRepository;
import vn.edu.iuh.fit.services.UserService;

import java.time.LocalDateTime;
import java.util.UUID;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private VerTokenRepository verTokenRepository;

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
    public UserResponse createUser(UserRequest userRequest, BindingResult result) {

        Role role = roleRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: 1"));
        if(!result.hasErrors()) {
            User user = this.convertToEntity(userRequest, UserRequest.class);
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            user.setRole(role);

           user = userRepository.save(user);

            VerificationToken confirm = VerificationToken.builder()
                    .user(user)
                    .token(UUID.randomUUID().toString())
                    .createDate(LocalDateTime.now())
                    .build();
            verTokenRepository.save(confirm);

            return this.convertToDto(user, UserResponse.class);
        }
        return null;
    }

    @Override
    public UserResponse findById(Long id) {
        return this.convertToDto(userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Can not find User with id: " + id)), UserResponse.class);
    }
}

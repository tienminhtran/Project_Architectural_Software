/**
 * @ (#) RoleServiceImpl.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.response.RoleResponse;
import vn.edu.iuh.fit.entities.Role;
import vn.edu.iuh.fit.repositories.RoleRepository;
import vn.edu.iuh.fit.services.RoleService;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    ModelMapper modelMapper;

    // entity to dto
    private RoleResponse convertToDto(Role role) {
        return modelMapper.map(role, RoleResponse.class);
    }

    // dto to entity
    private Role convertToEntity(RoleResponse roleResponse) {
        return modelMapper.map(roleResponse, Role.class);
    }
    @Override
    public List<RoleResponse> getAllRole() {
        return roleRepository.findAll().stream().map(this::convertToDto).toList();
    }

    @Override
    public RoleResponse getRoleById(Long id) {
        return convertToDto(roleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Can not find User with username: " + id)));}
}

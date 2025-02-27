/**
 * @ (#) RoleService.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.response.RoleResponse;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
public interface RoleService {
    List<RoleResponse> getAllRole();

    RoleResponse getRoleById(Long id);
}

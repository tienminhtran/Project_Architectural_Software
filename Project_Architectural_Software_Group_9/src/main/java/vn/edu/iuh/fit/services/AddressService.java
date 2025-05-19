/**
 * @ (#) AddressService.java      5/1/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.request.AddressRequest;
import vn.edu.iuh.fit.dtos.response.AddressResponse;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Tien Minh Tran
 * @date: 5/1/2025
 */
public interface AddressService {

    List<AddressResponse> getAllAddressesByUserId(Long userId);
    public AddressResponse save(AddressRequest request, Long userId) ;
    AddressResponse update(AddressRequest request, Long id);
    //update trang thai dia chi = false theo id
    AddressResponse updateStatus(Long id);
    //update dia chi
}
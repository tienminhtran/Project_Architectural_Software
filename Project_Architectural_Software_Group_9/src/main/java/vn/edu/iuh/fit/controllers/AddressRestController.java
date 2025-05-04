/**
 * @ (#) AddressRestController.java      5/1/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.AddressRequest;
import vn.edu.iuh.fit.dtos.response.AddressResponse;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.entities.Address;
import vn.edu.iuh.fit.services.AddressService;

import java.util.List;

/*
 * @description:
 * @author: Tien Minh Tran
 * @date: 5/1/2025
 */
@RestController
@RequestMapping("/api/v1/address")
public class AddressRestController {

    @Autowired
    private AddressService  addressService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<BaseResponse<?>> getAddressesByUserId(@PathVariable Long userId) {
        List<AddressResponse> addresses = addressService.getAllAddressesByUserId(userId);
        if (addresses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Danh sách địa chỉ")
                .response(addresses)
                .build());
    }

    @PostMapping("/{userId}")
    public ResponseEntity<BaseResponse<?>> createAddress(@PathVariable Long userId,
                                                         @RequestBody AddressRequest request) {
        AddressResponse created = addressService.save(request, userId);
        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Thêm địa chỉ thành công")
                .response(created)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> updateAddress(@PathVariable Long id,
                                                         @RequestBody AddressRequest request) {
        AddressResponse updated = addressService.update(request, id);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Cập nhật địa chỉ thành công")
                .response(updated)
                .build());
    }




}
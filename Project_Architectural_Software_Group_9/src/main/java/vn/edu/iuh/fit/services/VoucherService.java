/**
 * @ (#) VoucherService.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.dtos.request.VoucherRequest;
import vn.edu.iuh.fit.dtos.response.VoucherResponse;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
public interface VoucherService {
    void decreaseQuantity(Long id);

    VoucherResponse findValidVoucher(String name);

    List<VoucherResponse> findValidVoucher();

    List<VoucherResponse> findByQuantityGreaterThan(int quantityIsGreaterThan);

    List<VoucherResponse> findAll();

    VoucherResponse save(VoucherRequest voucherRequest);

    boolean deleteById(Long id);

    Optional<VoucherResponse> findById(Long id);

    Optional<VoucherResponse> findByName(String name);

    int getAvailableVoucherCount();

    boolean existsVoucher(String name);
}

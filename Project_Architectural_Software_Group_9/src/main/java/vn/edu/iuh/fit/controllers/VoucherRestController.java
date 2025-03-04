/**
 * @ (#) VoucherRestController.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.VoucherRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.VoucherResponse;
import vn.edu.iuh.fit.services.VoucherService;

import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@RestController
@RequestMapping("/api/v1/voucher")
public class VoucherRestController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("")
    public ResponseEntity<BaseResponse<?>> getAllVouchers() {
        List<?> vouchers = voucherService.findAll();
        if (vouchers == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all vouchers success").response(vouchers).build());
    }

    @PostMapping("")
    public ResponseEntity<BaseResponse<?>> createVoucher(@RequestBody VoucherRequest voucher) {

        if(voucherService.existsVoucher(voucher.getName())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value())
                    .body(BaseResponse.builder().status("FAILED").message("The voucher code already exists! ").build());
        }

        VoucherResponse newVoucher = voucherService.save(voucher);
        if (newVoucher == null ) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Create voucher success").response(newVoucher).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> deleteVoucher(@PathVariable Long id) {
        boolean isDeleted = voucherService.deleteById(id);
        if (!isDeleted) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Delete voucher success").build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> getVoucherById(@PathVariable Long id) {
        Object voucher = voucherService.findById(id);
        if (voucher == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get voucher by id success").response(voucher).build());
    }

    @GetMapping("/valid")
    public ResponseEntity<BaseResponse<?>> getValidVouchers() {
        List<?> vouchers = voucherService.findValidVoucher();
        if (vouchers == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get valid vouchers success").response(vouchers).build());
    }

    @GetMapping("/quantityGreater")
    public ResponseEntity<BaseResponse<?>> getVouchersByQuantityGreaterThan(@RequestParam int quantity) {
        List<?> vouchers = voucherService.findByQuantityGreaterThan(quantity);
        if (vouchers == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get vouchers by quantity greater than " + quantity + " success").response(vouchers).build());
    }

    @GetMapping("/countAvail")
    public ResponseEntity<BaseResponse<?>> getAvailableVoucherCount() {
        int count = voucherService.getAvailableVoucherCount();
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get available voucher count success").response(count).build());
    }



}

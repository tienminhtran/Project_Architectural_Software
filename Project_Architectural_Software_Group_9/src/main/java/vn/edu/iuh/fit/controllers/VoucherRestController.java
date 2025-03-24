/**
 * @ (#) VoucherRestController.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.VoucherRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.BrandResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.VoucherResponse;
import vn.edu.iuh.fit.services.VoucherService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @GetMapping("/all")
    public ResponseEntity<BaseResponse<?>> getAllVouchers() {
        List<?> vouchers = voucherService.findAll();
        if (vouchers == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all vouchers success").response(vouchers).build());
    }

    @GetMapping("")
    public ResponseEntity<BaseResponse<?>> getAllVouchers_Paging(@RequestParam(defaultValue = "0", required = false) Integer pageNo,
                                                                @RequestParam(defaultValue = "10", required = false) Integer pageSize) {
        if (pageNo == null) {
            pageNo = 0;
        }

        if (pageSize == null) {
            pageSize = 10;
        }
        PageResponse<?> vouchers = voucherService.findAll_Paging(pageNo, pageSize);

        if (vouchers == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all vouchers success").response(vouchers).build());
    }

    @PostMapping("")
    public ResponseEntity<BaseResponse<?>> createVoucher(@Valid @RequestBody VoucherRequest voucher, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            Map<String, Object> errors = new HashMap<String, Object>();
            bindingResult.getFieldErrors().forEach(result -> {
                errors.put(result.getField(), result.getDefaultMessage());
            });
            return ResponseEntity.status(HttpStatus.BAD_REQUEST.value())
                    .body(BaseResponse.builder().status("FAILED").message("Validation error").response(errors).build());
        }

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

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> updateVoucher(@PathVariable Long id,@RequestBody VoucherRequest voucherRequest) {

        VoucherResponse update = voucherService.update(id, voucherRequest);
        if (update == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Update voucher success").response(update).build());
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

    @PostMapping("/search")
    public ResponseEntity<BaseResponse<?>> searchVoucherByKeyWord(@RequestParam String keyword,
                                                                  @RequestParam(defaultValue = "0", required = false) Integer pageNo,
                                                                  @RequestParam(defaultValue = "10", required = false) Integer pageSize) {
        if(pageNo == null) {
            pageNo = 0;
        }

        if(pageSize == null) {
            pageSize = 10;
        }
        PageResponse<?> vouchers = voucherService.getVoucherByKeyWord(keyword, pageNo, pageSize);
        if (vouchers == null || vouchers.getValues().isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Search voucher by "+ keyword+" success").response(vouchers).build());
    }


}

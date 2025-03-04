/**
 * @ (#) VoucherServiceImpl.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.VoucherRequest;
import vn.edu.iuh.fit.dtos.response.VoucherResponse;
import vn.edu.iuh.fit.entities.Voucher;
import vn.edu.iuh.fit.repositories.VoucherRepository;
import vn.edu.iuh.fit.services.VoucherService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Service
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private ModelMapper modelMapper;

    //entity to dto
    private VoucherResponse convertToDto(Voucher voucher) {
        return modelMapper.map(voucher, VoucherResponse.class);
    }

    //dto to entity
    private Voucher convertToEntity(VoucherRequest voucherRequest) {
        return modelMapper.map(voucherRequest, Voucher.class);
    }

    @Override
    public void decreaseQuantity(Long id) {
        Voucher voucher = voucherRepository.findById(id).get();
        voucher.setQuantity(voucher.getQuantity() - 1);
        voucherRepository.save(voucher);
    }

    @Override
    public VoucherResponse findValidVoucher(String name) {
        Voucher voucher = voucherRepository.findByNameAndQuantityGreaterThanAndExpiredDateGreaterThan(name, 0, java.time.LocalDate.now());
        if (voucher != null) {
            return this.convertToDto(voucher);
        }
        return null;
    }

    @Override
    public List<VoucherResponse> findValidVoucher() {
        List<Voucher> vouchers = voucherRepository.findByQuantityGreaterThanAndExpiredDateGreaterThan(0, java.time.LocalDate.now());
        if (vouchers != null) {
            return vouchers.stream().map(this::convertToDto).toList();
        }
        return null;
    }

    @Override
    public List<VoucherResponse> findByQuantityGreaterThan(int quantityIsGreaterThan) {
        List<Voucher> vouchers = voucherRepository.findByQuantityGreaterThan(quantityIsGreaterThan);
        if (vouchers != null) {
            return vouchers.stream().map(this::convertToDto).toList();
        }
        return null;
    }

    @Override
    public List<VoucherResponse> findAll() {
        List<Voucher> vouchers = voucherRepository.findAll();
        if (vouchers != null) {
            return vouchers.stream().map(this::convertToDto).toList();
        }
        return null;
    }

    @Override
    public VoucherResponse save(VoucherRequest voucherRequest) {
        Voucher voucherEntity = this.convertToEntity(voucherRequest);
        Voucher voucher = voucherRepository.save(voucherEntity);
        if (voucher != null) {
            return this.convertToDto(voucher);
        }
        return null;
    }

    @Override
    public boolean deleteById(Long id) {
        Optional<Voucher> voucher = voucherRepository.findById(id);
        if (voucher.isPresent()) {
            voucher.get().setQuantity(0);
            voucherRepository.save(voucher.get());
            return true;
        }
        return false;
    }

    @Override
    public Optional<VoucherResponse> findById(Long id) {
        Optional<Voucher> voucher = voucherRepository.findById(id);
        return voucher.map(this::convertToDto);
    }

    @Override
    public Optional<VoucherResponse> findByName(String name) {
        Optional<Voucher> voucher = voucherRepository.findByName(name);
        return voucher.map(this::convertToDto);
    }

    @Override
    public int getAvailableVoucherCount() {
        LocalDate currentDate = LocalDate.now();
        List<Voucher> availableVouchers = voucherRepository.findByQuantityGreaterThanAndExpiredDateGreaterThan(0, currentDate);
        return availableVouchers.size();
    }

    @Override
    public boolean existsVoucher(String name) {
        Optional<Voucher> voucher = voucherRepository.findByName(name);
        if (voucher.isPresent()) {
            return true;
        }
        return false;
    }
}

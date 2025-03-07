package vn.edu.iuh.fit.controllers;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:46 AM
 * @nameProject: Project_Architectural_Software
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.BrandRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.BrandResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.services.BrandService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/brands")
public class BrandRestController {

    @Autowired
    private BrandService brandService;

    @GetMapping("")
    public ResponseEntity<BaseResponse<?>> getAllBrandByPage(@RequestParam(defaultValue = "0", required = false) Integer pageNo,
                                                             @RequestParam(defaultValue = "10", required = false) Integer pageSize) {
        if (pageNo == null) {
            pageNo = 0;
        }
        if (pageSize == null) {
            pageSize = 8;
        }
        PageResponse<?> brandResponses = brandService.getBrandsByPage(pageNo, pageSize);
        if (brandResponses == null || brandResponses.getValues().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all brands").response(brandResponses).build());
    }

    @GetMapping("/all")
    public ResponseEntity<BaseResponse<?>> getAllBrand() {
        List<BrandResponse> brandResponses = brandService.getAllBrands();
        if (brandResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all brands").response(brandResponses).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> getBrandById(@PathVariable Long id) {
        Object brand = brandService.findById(id);
        if (brand == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get brand by id success").response(brand).build());
    }

    @PostMapping("")
    public ResponseEntity<BaseResponse<?>> createBrand(@RequestBody BrandRequest brandRequest) {
        if (brandService.existsBrand(brandRequest.getName())) {
            return ResponseEntity.badRequest()
                    .body(BaseResponse.builder().status("FAILED").message("The brand already exists!").build());
        }
        BrandResponse newBrand = brandService.save(brandRequest);
        if (newBrand == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Create brand success").response(newBrand).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> updateBrand(@RequestBody BrandRequest brandRequest, @PathVariable Long id) {
        BrandResponse updatedBrand = brandService.update(brandRequest, id);
        if (updatedBrand == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Update brand success").response(updatedBrand).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> deleteBrand(@PathVariable Long id) {
        boolean isDeleted = brandService.delete(id);
        if (!isDeleted) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Delete brand success").build());
    }


}

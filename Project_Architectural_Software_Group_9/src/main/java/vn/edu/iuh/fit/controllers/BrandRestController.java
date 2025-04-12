package vn.edu.iuh.fit.controllers;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:46 AM
 * @nameProject: Project_Architectural_Software
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
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
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<BaseResponse<?>> getAllBrand() {
        List<BrandResponse> brandResponses = brandService.getAllBrands();
        if (brandResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all brands").response(brandResponses).build());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<BaseResponse<?>> getBrandById(@PathVariable Long id) {
        Object brand = brandService.findById(id);
        if (brand == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get brand by id success").response(brand).build());
    }

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<BaseResponse<?>> createBrand(@RequestPart("brand") String brandJson, @RequestPart(value = "brandImg", required = false) List<MultipartFile> brandImg) {
        ObjectMapper objectMapper = new ObjectMapper();
        BrandRequest brandRequest;
        try {
            brandRequest = objectMapper.readValue(brandJson, BrandRequest.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON" + e.getMessage());
        }
        brandRequest.setBrandImg(brandImg);
        BrandResponse newBrand = brandService.save(brandRequest);
        if (newBrand == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Create brand success").response(newBrand).build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<BaseResponse<?>> updateBrand(@RequestPart("brand") String brandJson, @RequestPart(value = "brandImg", required = false) List<MultipartFile> brandImg, @PathVariable Long id) {
        ObjectMapper objectMapper = new ObjectMapper();
        BrandRequest brandRequest;
        try {
            brandRequest = objectMapper.readValue(brandJson, BrandRequest.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON" + e.getMessage());
        }
        brandRequest.setBrandImg(brandImg);
        BrandResponse newBrand = brandService.update(brandRequest, id);
        if (newBrand == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Update brand success").response(newBrand).build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<BaseResponse<?>> deleteBrand(@PathVariable Long id) {
        boolean isDeleted = brandService.delete(id);
        if (!isDeleted) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Delete brand success").build());
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<BaseResponse<?>> searchBrand(@PathVariable String keyword,
                                                       @RequestParam(defaultValue = "0", required = false) Integer pageNo,
                                                       @RequestParam(defaultValue = "10", required = false) Integer pageSize) {
        if (pageNo == null) {
            pageNo = 0;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        PageResponse<BrandResponse> brandREsponse = brandService.searchBrand(keyword, pageNo, pageSize);
        if (brandREsponse == null || brandREsponse.getValues().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Search brand success").response(brandREsponse).build());
    }
}

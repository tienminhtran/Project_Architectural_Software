package vn.edu.iuh.fit.controllers;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:46 AM
 * @nameProject: Project_Architectural_Software
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.services.BrandService;

@RestController
@RequestMapping("/api/v1/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> getBrandById(@PathVariable Long id) {
        Object brand = brandService.findById(id);
        if (brand == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get brand by id success").response(brand).build());
    }
}

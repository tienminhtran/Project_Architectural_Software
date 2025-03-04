package vn.edu.iuh.fit.controllers;/*
 * @description:
 * @author: TienMinhTran
 * @date: 4/3/2025
 * @time: 2:26 PM
 * @nameProject: BTL
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.services.CategoryService;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryRestController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get category by id success").response(categoryService.findById(id)).build());
    }



}

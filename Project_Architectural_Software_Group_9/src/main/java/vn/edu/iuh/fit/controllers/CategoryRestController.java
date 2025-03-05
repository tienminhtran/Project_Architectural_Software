package vn.edu.iuh.fit.controllers;/*
 * @description:
 * @author: TienMinhTran
 * @date: 4/3/2025
 * @time: 2:26 PM
 * @nameProject: BTL
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.CategoryRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.CategoryResponse;
import vn.edu.iuh.fit.services.CategoryService;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryRestController {

    @Autowired
    private CategoryService categoryService;


    //http://localhost:8080/api/v1/category
    @GetMapping("")
    public ResponseEntity<BaseResponse<?>> getAllCategory() {
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get all category success").response(categoryService.findAll()).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get category by id success").response(categoryService.findById(id)).build());
    }

    @GetMapping("/name/{categoryName}")
    public ResponseEntity<BaseResponse<?>> getCategoryByName(@PathVariable String categoryName) {
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get category by name success").response(categoryService.findByCategoryName(categoryName)).build());
    }


    @PostMapping("")
    public ResponseEntity<BaseResponse<?>> createCategory(@RequestBody CategoryRequest categoryRequest) {
        if(categoryService.existsCategory(categoryRequest.getName())){
            return ResponseEntity.badRequest()
                    .body(BaseResponse.builder().status("FAILED").message("The category already exists!").build());
        }
        CategoryResponse newCategory = categoryService.save(categoryRequest);
        if (newCategory == null ) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Create category success").response(newCategory).build());
    }
    /*
        Test API; POSTMAN
            {
                 "description": "An electronic machine that is used for storing, organizing, and finding words, numbers, etc.",
                 "active": true,
                  "name": "H25"
            }
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> deleteCategory(@PathVariable Long id) {
        boolean isDeleted = categoryService.deleteCategory(id);
        if (!isDeleted) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Delete category success").build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse<?>> updateCategory(@RequestBody CategoryResponse categoryResponse, @PathVariable Long id) {
        boolean isUpdated = categoryService.updateCategory(categoryResponse, id);
        if (!isUpdated) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Update category success").build());
    }
    /*

      {
            "id": 4,
            "name": "H25",
            "description": "An electronic machine",
            "active": false
        }
     */






}

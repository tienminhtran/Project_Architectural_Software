package vn.edu.iuh.fit.services;/*
 * @description:
 * @author: TienMinhTran
 * @date: 4/3/2025
 * @time: 3:06 PM
 * @nameProject: Project_Architectural_Software
 */

import vn.edu.iuh.fit.dtos.request.CategoryRequest;
import vn.edu.iuh.fit.dtos.response.CategoryResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.VoucherResponse;
import vn.edu.iuh.fit.entities.Category;

import java.net.CacheRequest;
import java.net.CacheResponse;
import java.util.List;
import java.util.Optional;

public interface CategoryService {

    Optional<CategoryResponse> findById(Long id);
    List<CategoryResponse> findAll();
    Category findByCategoryName(String categoryName);
    CategoryResponse save(CategoryRequest categoryRequest);
//    boolean updateCategory(CategoryRequest categoryRequest, Long id);
    boolean deleteCategory(Long id);

    boolean existsCategory(String name);

    boolean updateCategory(CategoryResponse categoryResponse, Long id);

    PageResponse<CategoryResponse> findAll_Paging(int pageNo, int pageSize);



}

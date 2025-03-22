package vn.edu.iuh.fit.services.impl;/*
 * @description:
 * @author: TienMinhTran
 * @date: 4/3/2025
 * @time: 3:06 PM
 * @nameProject: Project_Architectural_Software
 */

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.CategoryRequest;
import vn.edu.iuh.fit.dtos.response.CategoryResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.VoucherResponse;
import vn.edu.iuh.fit.entities.Category;
import vn.edu.iuh.fit.entities.Voucher;
import vn.edu.iuh.fit.repositories.CategoryRepository;
import vn.edu.iuh.fit.services.CategoryService;

import java.net.CacheRequest;
import java.net.CacheResponse;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

//    @Autowired
//    ProductRepository productRepository;


    //entity to dto
    private CategoryResponse convertToDto(Category category) {

        return modelMapper.map(category, CategoryResponse.class);
    }

    //dto to entity
    private Category convertToEntity(CategoryRequest categoryRequest) {
        return modelMapper.map(categoryRequest, Category.class);
    }

    /**
     * Find category by id
     * @param id
     * @return category
     */
    @Override
    public Optional<CategoryResponse> findById(Long id) {
        Optional<Category> category = categoryRepository.findCategoryById(id);
        if (category.isPresent()) {
            return Optional.of(modelMapper.map(category.get(), CategoryResponse.class));
        }
        return Optional.empty();
    }


    /**
     * Find all categories
     * @return list of categories
     */
    @Override
    public List<CategoryResponse> findAll() {

        return categoryRepository.findAll().stream().map(this::convertToDto).toList();
    }



    /**
     * Find category by name
     * @param categoryName
     * @return category
     */
    @Override
    public Category findByCategoryName(String categoryName) {
        return categoryRepository.findCategoryByName(categoryName).orElse(null);
    }

    @Override
    public List<CategoryResponse> findKeyWord(String keyword) {

        List<Category> categories = categoryRepository.findKeyWork(keyword);
        if (categories != null) {
            return categories.stream().map(this::convertToDto).toList();
        }
        return null;
    }


    /**
     * Add category
     * @param categoryRequest
     * @return boolean
     */
    @Override
    public CategoryResponse save(CategoryRequest categoryRequest) {
        Category categoryEntity = this.convertToEntity(categoryRequest);
        Category category = categoryRepository.save(categoryEntity);
        if (category != null) {
            return this.convertToDto(category);
        }
        return null;
    }


    @Override
    public boolean existsCategory(String name) {
        Optional<Category> category = categoryRepository.findCategoryByName(name);
        if (category.isPresent()) {
            return true;
        }
        return false;
    }

    /**
     * Update category
     * @param categoryResponse
     * @param id
     * @return boolean
     */
    @Override
    public boolean updateCategory(CategoryResponse categoryResponse, Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            category.get().setName(categoryResponse.getName());
            category.get().setDescription(categoryResponse.getDescription());
            category.get().setActive(categoryResponse.isActive());
            categoryRepository.save(category.get());
            return true;
        }
        return false;
    }

    @Override
    public PageResponse<CategoryResponse> findAll_Paging(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Category> categories = categoryRepository.findAll(pageable);
        PageResponse<CategoryResponse> pageResponse = new PageResponse<>();
        if (categories != null) {
            pageResponse.setPage(pageNo);
            pageResponse.setSize(pageSize);
            pageResponse.setTotal(categories.getNumberOfElements());
            pageResponse.setTotalPages(categories.getTotalPages());
            pageResponse.setValues(categories.stream().map(this::convertToDto).toList());
        }
        return pageResponse;
    }


//    @Override
//    public boolean updateCategory(CategoryRequest categoryRequest, Long id) {
//        return false;
//    }
//

    /**
     * Delete category
     * @param id
     * @return boolean
     */
    @Override
    public boolean deleteCategory(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            category.get().setActive(false);
            categoryRepository.save(category.get());
            return true;
        }
        return false;
    }
}

package vn.edu.iuh.fit.services.impl;/*
 * @description:
 * @author: TienMinhTran
 * @date: 4/3/2025
 * @time: 3:06 PM
 * @nameProject: Project_Architectural_Software
 */

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.CategoryRequest;
import vn.edu.iuh.fit.dtos.response.CategoryResponse;
import vn.edu.iuh.fit.entities.Category;
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
    private CacheResponse convertToDto(Category category) {
        return modelMapper.map(category, CacheResponse.class);
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

//    @Override
//    public List<Category> findAll() {
//        return null;
//    }
//

    /**
     * Find category by name
     * @param categoryName
     * @return category
     */
    @Override
    public Category findByCategoryName(String categoryName) {
        return categoryRepository.findCategoryByName(categoryName).orElse(null);
    }
//
//    @Override
//    public boolean addCategory(CacheRequest categoryRequest) {
//        return false;
//    }
//
//    @Override
//    public boolean updateCategory(CategoryRequest categoryRequest, Long id) {
//        return false;
//    }
//
//    @Override
//    public boolean deleteCategory(Long id) {
//        return false;
//    }
}

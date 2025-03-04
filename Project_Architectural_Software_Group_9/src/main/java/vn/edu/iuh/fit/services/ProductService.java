/**
 * @ (#) ProductService.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(Long id);

    PageResponse<ProductResponse> getProductsByPage(int pageNo, int pageSize);


}

/**
 * @ (#) ProductFilterRequest.java      5/18/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 5/18/2025
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductFilterRequest {
    private Long categoryId;
    private List<String> brands;
    private List<String> cpus;
    private List<String> rams;
//    private List<String> ssds;
//    private List<String> vgas;
    private List<String> monitors;
    private Double minPrice;
    private Double maxPrice;
    private Boolean inStock;
}


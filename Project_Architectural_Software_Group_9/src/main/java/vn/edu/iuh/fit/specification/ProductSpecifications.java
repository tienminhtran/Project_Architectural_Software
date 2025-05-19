/**
 * @ (#) ProductSpecifications.java      5/18/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import vn.edu.iuh.fit.entities.Brand;
import vn.edu.iuh.fit.entities.Category;
import vn.edu.iuh.fit.entities.Product;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 5/18/2025
 */
public class ProductSpecifications {
    public static Specification<Product> hashCategory(Long categoryId) {
        return (root, query, criteriaBuilder) -> {
            if (categoryId == null) {
                return null;
            }
            Join<Product, Category> categoryJoin = root.join("category", JoinType.INNER);
            return criteriaBuilder.equal(categoryJoin.get("id"), categoryId);
        };
    }
    public static Specification<Product> hashBrandIn(List<String> brands) {
        
        return (root, query, criteriaBuilder) -> {
            if (brands == null || brands.isEmpty()) {
                return null;
            }
            Join<Product, Brand> brandJoin = root.join("brand", JoinType.INNER);
            return brandJoin.get("name").in(brands);
        };
    }

    public static Specification<Product> hashMonitorInn(List<String> monitors) {
        return (root, query, criteriaBuilder) -> {
            if (monitors == null || monitors.isEmpty()) {
                return null;
            }
            return root.get("monitor").in(monitors);
        };
    }

    public static Specification<Product> hashRamIn(List<String> rams) {
        return (root, query, criteriaBuilder) -> {
            if (rams == null || rams.isEmpty()) {
                return null;
            }
            return root.get("ram").in(rams);
        };
    }

    public static Specification<Product> hashBetweenPrice(double min, double max) {
        return (root, query, criteriaBuilder) -> {
           if(min > max || (min == 0 && max == 0)) {
               return null;
           }
            return criteriaBuilder.between(root.get("price"), min, max);
        };
    }

    public static Specification<Product> hashCPUIn(List<String> cpus) {
        return (root, query, criteriaBuilder) -> {
            if (cpus == null || cpus.isEmpty()) {
                return null;
            }
            return root.get("cpu").in(cpus);
        };
    }

    public static Specification<Product> hashInStock(boolean inStock) {
        return (root, query, criteriaBuilder) -> {
            if(inStock == false) {
                return criteriaBuilder.equal(root.get("stockQuantity"), 0);
            }
            return criteriaBuilder.greaterThan(root.get("stockQuantity"), 0);
        };
    }

    public static Specification<Product> hashInGraphicCards(List<String> graphicCards) {
        return ((root, query, criteriaBuilder) -> {
            if (graphicCards == null || graphicCards.isEmpty()) {
                return null;
            }
            return root.get("graphicCard").in(graphicCards);
        });
    }
}

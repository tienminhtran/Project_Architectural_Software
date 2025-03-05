package vn.edu.iuh.fit.services;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:51 AM
 * @nameProject: Project_Architectural_Software
 */

import vn.edu.iuh.fit.dtos.response.BrandResponse;
import vn.edu.iuh.fit.entities.Brand;

import java.util.Optional;

public interface BrandService {
    Optional<BrandResponse> findById(Long aLong);
}
